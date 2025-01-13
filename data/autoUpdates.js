const cron = require('node-cron');
const db = require('./initialize');


cron.schedule('10 10 * * *', async () => {
    try {
        const [rides] = await db.query(`
            select rid , distance , email , seats , avail_seat FROM ride
            WHERE date = curdate() and time < curtime() and status='sessioned';
        `);
        const [result] = await db.query(`
            update ride set status='completed'
            WHERE date = curdate() and time < curtime() and status='sessioned';
        `);
        console.log(`updated ${result.affectedRows} old rides.`);
        
        const updatePromises = rides.map(async (ride) => {
            console.log(ride);
            const Fuel_Saved=0.08 * ride.distance;
            const co2_Reduced=Fuel_Saved * 2.31;
            const factor = ride.seats - ride.avail_seat;
            await db.execute('insert into energy_con ( distance ,fuel_saved,email) VALUES (?,?,?) ON DUPLICATE KEY UPDATE   distance = distance + VALUES(distance),fuel_saved = fuel_saved + VALUES(fuel_saved)' , [ride.distance,factor * Fuel_Saved,ride.email]);
            await db.execute('insert into co2 (reduced,email) VALUES (?,?) ON DUPLICATE KEY UPDATE reduced = reduced + VALUES(reduced)' , [factor * co2_Reduced,ride.email]);

            const [passengers] = await db.query(`
                SELECT p_email , seats 
                FROM booking
                WHERE rid = ? AND status = 'accepted';
            `, [ride.rid]);

            passengers.forEach(async (passenger) => {
                await db.query(`
                    INSERT INTO energy_con (distance, fuel_saved, email) 
                    VALUES (?, ?, ?) 
                    ON DUPLICATE KEY UPDATE 
                        fuel_saved = fuel_saved + VALUES(fuel_saved), 
                        distance = distance + VALUES(distance);
                `, [ride.distance, passenger.seats * Fuel_Saved, passenger.p_email]);

                await db.query(`
                    INSERT INTO co2 (reduced, email) 
                    VALUES (?, ?) 
                    ON DUPLICATE KEY UPDATE 
                        reduced = reduced + VALUES(reduced);
                `, [passenger.seats * co2_Reduced, passenger.p_email]);
            });

        });

        await Promise.all(updatePromises);

    } catch (error) {
        console.error('Error deleting old bookings:', error);
    }
});
const cron = require('node-cron');
const db = require('./initialize');


//deletes old pending requests
cron.schedule('0 * * * *', async () => {
    try {
        const [result] = await db.query(`
            DELETE FROM booking
            WHERE status='pending' and bookedAt < date_sub(now(), interval 1 day);
        `);
        console.log(`Deleted ${result.affectedRows} old bookings.`);
    } catch (error) {
        console.error('Error deleting old bookings:', error);
    }
});

//old rides
cron.schedule('11 11 * * *', async () => {
    try {
        const result = await db.query(`
            DELETE FROM ride
            WHERE date < date_sub(curdate(), interval 15 days);
        `);
        console.log(`Deleted ${result.affectedRows} old rides.`);
    } catch (error) {
        console.error('Error deleting old bookings:', error);
    }
});

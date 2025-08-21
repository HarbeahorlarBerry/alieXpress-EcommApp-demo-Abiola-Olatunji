<<<<<<< HEAD
import User from "../Models/usersSchema.js";
import { scheduleCron } from "../utils/cron.js";
import { sendMail } from "../utils/sendEmail.js";

export const startCleanUp  =() => {
    scheduleCron(`* * * * *`,async () => {
        console.log(`cron job cleaning up unverified users`);
        const lastSixHours = new Date(Date.now() - 1 * 60 * 1000);
        try {
            const unverifiedRegisteredUsers = await User.deleteMany({
                isVerified: false,
                createdAt: {$lt: lastSixHours}
            });
            console.log(`deleted ${unverifiedRegisteredUsers.deletedCount} unverified users`);
            
        } catch (error) {
            console.log(error); 
        };
        
    });
};

export const sendMailReminder = async () =>{
    scheduleCron(`0 0 * * *`, async () => {
        console.log(`cron job sending reminder mails`);
        try {
            const unverifiedRegisteredUsers = await User.find({
                isVerified: false,
                createdAt: {$lt: new Date(Date.now() - 1 * 60 * 1000) }
            });
            console.log(`found ${unverifiedRegisteredUsers.length} unverified users`);
            for (let i = 0; i < unverifiedRegisteredUsers.length; i++) {
                const user = unverifiedRegisteredUsers[i];
                const mailObj = {
        mailFrom: `Aliexpress ${process.env.EMAIL_USER}`,
        mailTo: user.gmail,
        subject: 'Verify your account',
        body:`
            <h1>Welcome to ALiexpress <strong>${user.username}</strong> 😍</h1>
            <p>Please verify your account by clicking on the link below</p>
            <p>Your username is ${process.env.SUPORT}</p>
            <a href="http: //localhost:1000/api/auth/verify/${user.otp}">Verify</a>

          `
            }
            const info = await sendMail(mailObj);
            console.log(info);
            
                
            }
            
        } catch (error) {
            console.log(error);
            
            
        };
        
    });

=======
import User from "../Models/usersSchema.js";
import { scheduleCron } from "../utils/cron.js";
import { sendMail } from "../utils/sendEmail.js";

export const startCleanUp  =() => {
    scheduleCron(`* * * * *`,async () => {
        console.log(`cron job cleaning up unverified users`);
        const lastSixHours = new Date(Date.now() - 1 * 60 * 1000);
        try {
            const unverifiedRegisteredUsers = await User.deleteMany({
                isVerified: false,
                createdAt: {$lt: lastSixHours}
            });
            console.log(`deleted ${unverifiedRegisteredUsers.deletedCount} unverified users`);
            
        } catch (error) {
            console.log(error); 
        };
        
    });
};

export const sendMailReminder = async () =>{
    scheduleCron(`0 0 * * *`, async () => {
        console.log(`cron job sending reminder mails`);
        try {
            const unverifiedRegisteredUsers = await User.find({
                isVerified: false,
                createdAt: {$lt: new Date(Date.now() - 1 * 60 * 1000) }
            });
            console.log(`found ${unverifiedRegisteredUsers.length} unverified users`);
            for (let i = 0; i < unverifiedRegisteredUsers.length; i++) {
                const user = unverifiedRegisteredUsers[i];
                const mailObj = {
        mailFrom: `Aliexpress ${process.env.EMAIL_USER}`,
        mailTo: user.gmail,
        subject: 'Verify your account',
        body:`
            <h1>Welcome to ALiexpress <strong>${user.username}</strong> 😍</h1>
            <p>Please verify your account by clicking on the link below</p>
            <p>Your username is ${process.env.SUPORT}</p>
            <a href="http: //localhost:1000/api/auth/verify/${user.otp}">Verify</a>

          `
            }
            const info = await sendMail(mailObj);
            console.log(info);
            
                
            }
            
        } catch (error) {
            console.log(error);
            
            
        };
        
    });

>>>>>>> 0d63b00672bda2fa831c980a89e1892c9c48ad22
};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.investmentnotification = void 0;
function investmentnotification(token) {
    const link = `http://localhost:3000/api-v1/users/verify/${token}`;
    // const link = `http://localhost:3001/login/${token}`;
    let temp = `
       <div style="max-width: 700px;text-align: center; text-transform: uppercase;
       margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
       <h2 style="color: teal;">Welcome to Airtym2cAsh</h2>
       <p>Please Follow the link by clicking on the button to verify your email
        </p>
        <div style="text-align:center ;">
          <a href=${link}
         style="background: #277BC0; text-decoration: none; color: white;
          padding: 10px 20px; margin: 10px 0;
         display: inline-block;">Click here</a>
        </div>
     </div>
        `;
    return temp;
}
exports.investmentnotification = investmentnotification;
//# sourceMappingURL=investMailer.js.map
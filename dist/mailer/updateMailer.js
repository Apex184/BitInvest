"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatenotification = void 0;
function updatenotification(updateUser) {
    const link = `http://localhost:3000/users/${updateUser}`;
    let temp = `
       <div style="max-width: 700px;text-align: center; text-transform: uppercase;
       margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
       <h2 style="color: teal;">Welcome to BitInvest</h2>
       <p>Please Follow the link by clicking on the button to verify your email
        </p>
        <div style="text-align:center ;">
     
         <div style="text-align:center ;">${updateUser}</div>
         style="background: #277BC0; text-decoration: none; color: white;
          padding: 10px 20px; margin: 10px 0;
         display: inline-block;">Click here</a>
        </div>
     </div>
        `;
    return temp;
}
exports.updatenotification = updatenotification;
//# sourceMappingURL=updateMailer.js.map
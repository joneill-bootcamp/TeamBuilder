const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team_array = [];

// Define the add confirm inquirer array
const add = [{
    type: "confirm",
    name: "add",
    message: "Continue building team?",
}, ];

// Define the employee type inquirer questions array
const employeeType = [{
    type: "list",
    name: "choice",
    message: "Please choose the team member role",
    choices: ["Engineer", "Intern"],
}, ];

function init() {

    var theManager = new Manager();
    console.log(theManager);
    getDetails(theManager);
}

async function getDetails(teamMember) {

    // Get Generic details commond to all Team Members
    const teamMemberInquiry = [{
            type: "input",
            name: "name",
            message: `What is the ${teamMember} name ?`,
        },
        {
            type: "input",
            name: "id",
            message: `What is the ${teamMember.className} id ?`,
        },
        {
            type: "input",
            name: "email",
            message: `What is the ${teamMember.className} email ?`,
        },
    ];

    // Add role specific questions to quentionaire
    switch (teamMember.className) {
        case 'Manager':
            teamMemberInquiry.push({
                type: "input",
                name: "phone",
                message: `What is the Managers' office phone number ?`,
            }, )
            break;
        case 'Intern':
            teamMemberInquiry.push({
                type: "input",
                name: "school",
                message: "What school does intern attend ?",
            }, )
            break;
        case 'Engineer':
            teamMemberInquiry.push({
                type: "input",
                name: "github",
                message: "Please supply the Engineer's github URL ?",
            }, )
            break;
    }

    inquirer.prompt(teamMemberInquiry)
        .then(console.log('done'));
}

init();
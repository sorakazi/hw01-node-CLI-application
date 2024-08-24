import {Command} from "commander";
import {
    listContacts,
    getContactById,
    removeContact,
    addContact,
} from "./contacts.js";

const program = new Command();
program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");
program.parse(process.argv);
const argv = program.opts();

const invokeAction = async ({action, id, name, email, phone}) => {
    switch (action) {
        case "list":
            // When the action is "list", retrieve and display all contacts
            console.log('Fetch all contacts');
            const contacts = await listContacts();
            console.table(contacts);
            break;
        case "get":
            console.log(`Get contact by id: ${id}`);
            const contact = await getContactById(id);
            console.log(contact || `Contact with id ${id} not found`);
            break;
        case "add":
            const newContact = await addContact({name, email, phone});
            console.log("Contact added:", newContact);
            break;
        case "remove":
            console.log(`Remove contact by id: ${id}`);
            const removedContact = await removeContact(id);
            console.log(
                removedContact
                    ? "Contact removed:"
                    : `Contact with id ${id} not found`,
                removedContact
            );
            break;
        default:
            // If an unknown action is provided, display a warning message in red color
            console.warn("\x1B[31m Unknown action type!");
    }
};

// Function to start the application and perform the specified action
const start = async (argv) => {
    try {
        await invokeAction(argv); // Invoke the action based on the parsed command-line arguments
    } catch (error) {
        console.log(error); // If any error occurs during execution, log the error message
    }
};

// Starting the application by calling the start function with the parsed command-line arguments
void start(argv);
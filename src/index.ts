import { readConfig, setUser } from "./config";

function main() {
    setUser("Vextes");
    let config = JSON.stringify(readConfig());
    console.log(`read: ${config}`);
}

main();
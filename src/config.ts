import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
    dbUrl: string;
    currentUserName: string;
}

export function setUser(username: string) {
    const startingConfig = readConfig();
    startingConfig.currentUserName = username;
    writeConfig(startingConfig);
}

export function readConfig(): Config {
    const configFilePath = getConfigFilePath()
    const configData = fs.readFileSync(configFilePath, { encoding: 'utf-8'});
    let configObj = JSON.parse(configData);
    let validConfig: Config = {
        dbUrl: configObj.db_url,
        currentUserName: configObj.current_user_name
    }
    return validConfig;
}

function getConfigFilePath(): string {
    const filename = "/.gatorconfig.json"
    const fileDir = os.homedir();
    return path.join(fileDir, filename);
}

function writeConfig(cfg: Config): void {
    const configFilePath = getConfigFilePath();
    let resultConfig = {
        db_url: cfg.dbUrl,
        current_user_name: cfg.currentUserName
    };
    fs.writeFileSync(configFilePath, JSON.stringify(resultConfig), {encoding: "utf-8"});
}
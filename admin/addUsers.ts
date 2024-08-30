import { Command } from "commander";
import { auth, db } from "./firebase";
import { promises as fsPromises } from "fs";
import { confirm } from "@inquirer/prompts";

const program = new Command();
program
  .name("ユーザーの追加")
  .version("0.0.1")
  .option("-p,--p <path>", "ユーザーの情報が記載されたcsvファイルのパス")
  .action(options => {
    if (typeof options.p !== "string") {
      console.error("パスを指定してください");
      process.exit(1);
    }
    addUsers(options.p);
  })
  .parse(process.argv);
async function addUsers(filePath: string) {
  const file = await fsPromises.readFile(filePath, "utf-8");
  const [, ...users] = file
    .split("\n")
    .map(line => {
      const [stallId, email, password] = line.replace(/\r/g, "").split(",");
      return { stallId, email, password };
    })
    .filter(user => user.email && user.password && user.stallId);
  console.table(users.map(user => ({ ...user, password: "********" })));
  const answer = await confirm({
    message: "これらのユーザーを追加しますか？",
    default: false,
  });
  if (!answer) {
    console.log("中止しました");
    process.exit(0);
  }
  const ref = db.ref("users");
  for (const user of users) {
    try {
      const userRecord = await auth.createUser({
        email: user.email,
        password: user.password,
      });
      const userRef = ref.child(userRecord.uid);
      await userRef.set({
        stallId: user.stallId,
      });
      console.log(`${user.email}を追加しました`);
    } catch (e) {
      console.error(`${user.email}の追加に失敗しました: ${e}`);
    }
  }
}

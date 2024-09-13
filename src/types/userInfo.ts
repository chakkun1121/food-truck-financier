export type UserInfo = {
  stallId?: string;
  lastTicket?: number; //最後に発見した整理券の番号
  userNumber: number; //ユーザーごとに固有 0から割り振る
};
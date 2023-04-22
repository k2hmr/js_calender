//今日の日付
const today = new Date();
const thisYear = today.getFullYear();
const thisMonth = Number(today.getMonth()) + 1;
const thisDay = today.getDate();

//-mオプションとそのバリデーション
const isOption = process.argv[2] !== undefined;
const isNotOptionM = process.argv[2] !== "-m";
const optionM = process.argv[3];
const isThere4thArg = process.argv[4] ? true : false;
const isOptionMInvalid =
  optionM && (!Number(optionM) || optionM < 1 || 12 < optionM);

if (isOption && (isNotOptionM || isThere4thArg))
  return console.log("Option is only first -m");
if (isOption && isOptionMInvalid) return console.log("Option m is invalid!");

const weekLabel = "Su Mo Tu We Th Fr Sa";
const targetDate = optionM ? new Date(`${optionM}-1-${thisYear}`) : today;
const targetYear = targetDate.getFullYear();
const targetMonth = Number(targetDate.getMonth()) + 1;
const firstDayOfWeek = new Date(targetYear, targetMonth - 1, 1).getDay();
const lastDateOfMonth = new Date(targetYear, targetMonth, 0).getDate() + 1;
const monthNameLong = targetDate.toLocaleString("en-US", { month: "long" });

//カレンダーのラベル
console.log(`     ${monthNameLong} ${targetYear}`);
console.log(weekLabel);

//日付の行列の作成
let currentCalenderRow = " ".repeat(3 * firstDayOfWeek);
for (let i = 1; i <= lastDateOfMonth; i++) {
  let date = i.toString();
  //今日の日付には背景色をつける
  if (targetYear === thisYear && targetMonth === thisMonth && i === thisDay) {
    date = `\x1b[47m${date}\x1b[0m`;
  }

  //日曜日の日付になったら次の行に移行する
  const targetDay = new Date(targetYear, targetMonth - 1, i);
  if ((i > 1 && targetDay.getDay() === 0) || i === lastDateOfMonth) {
    console.log(currentCalenderRow);
    currentCalenderRow = "";
  }

  //日付の行がスタートの時はスペースを1つ追加する
  if (currentCalenderRow !== "") currentCalenderRow += " ".repeat(1);
  //日付が1より大きい一桁の数字の時もしくは日付が1で日曜日の時はスペースを1つ追加して日付(stringI)を追加
  //上記外はそのまま日付(stringI)を追加
  if ((1 < i && i < 10) || (i === 1 && firstDayOfWeek === 0)) {
    currentCalenderRow += " ".repeat(1) + date;
  } else {
    currentCalenderRow += date;
  }
}

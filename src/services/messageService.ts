const BOT_REPLIES = [
  'Вау! Как интересно!',
  'Ты краш моей души!',
  'Интересно, расскажи подробнее!',
  'Понял, спасибо за информацию.',
  'Хороший вопрос!',
  'Отличная идея!',
  'Согласен с тобой!',
  'Это важный момент, запомню.',
  'Работаем над этим!',
  'Спасибо, что поделился!',
  'Дай мне секунду, подумаю...',
];

const SEND_DELAY_MIN = 300;
const SEND_DELAY_MAX = 500;

const REPLY_DELAY_MIN = 2000;
const REPLY_DELAY_MAX = 3000;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const FAILURE_RATE = 0.2;

export async function sendMessage(): Promise<void> {
  await delay(randomBetween(SEND_DELAY_MIN, SEND_DELAY_MAX));

  if (Math.random() < FAILURE_RATE) {
    throw new Error('Network error: failed to send message');
  }
}

export async function getBotReply(): Promise<string> {
  await delay(randomBetween(REPLY_DELAY_MIN, REPLY_DELAY_MAX));

  return BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)];
}

const axios = require('axios');

const serverToken = process.env.SERVER_TOKEN;
const cookie = process.env.GLADOS_COOKIE;

async function checkin() {
  try {
    const result = await axios({
      method: 'POST',
      url: 'https://glados.rocks/api/user/checkin',
      data: {
        token: 'glados.one',
      },
      headers: {
        cookie: cookie,
      },
    }).then((resp) => resp.data);

    console.log(result.message);
    console.log(result);

    const title = 'Glados: ' + result.message;

    // 推送成功消息通知
    await axios.post(
      `https://sctapi.ftqq.com/${serverToken}.send?title=${encodeURIComponent(
        title,
      )}&desp=${encodeURIComponent(`\`\`\`json\n${JSON.stringify(result.list?.[0], null, 2)}\n\`\`\``)}`,
    );
  } catch (err) {
    // 推送失败消息通知
    await axios
      .post(
        `https://sctapi.ftqq.com/${serverToken}.send?title=CheckinError&desp=${encodeURIComponent(
          `\`\`\`json\n${JSON.stringify(err.message, null, 2)}\n\`\`\``,
        )}`,
      )
      .catch((error) => {
        console.error(error);
      });
  }
}

checkin();

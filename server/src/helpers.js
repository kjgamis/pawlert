const { Ai } = require('@cloudflare/ai')

const askAi = async (c, prompt) => {
  const ai = new Ai(c.env.AI)
  console.log(prompt)
  let answer = await ai.run(
    '@cf/meta/llama-2-7b-chat-int8',
    {
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    }
  )
  return answer
}

module.exports = {
  askAi
}

"""
MIT License

Copyright (c) 2023 @Qewertyy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"""

from yourbot import(
    userbot as ub,
    app
)
from telethon import(
    errors,
    events, 
    Button
)
from telethon.tl.types import InputMessagesFilterPhotos

@app.on(events.NewMessage(incoming=True, pattern=r"^[!/]search|^[!/]find ?(.*)"))
async def mangastash(event):
  channel_id = -100123456789
  channel_username = "Channel_Username"
  query = event.message.text.split(" ", 1)
  try:
    query = query[1]
  except IndexError:
    await event.reply("This will work like `/search name`\nexample: `/search one piece`")
    return
  if event.reply_to_msg_id:
    event = await event.get_reply_message()
  keybtns = []
  text = ''
  user = f"[{event.sender.first_name}](tg://user?id={event.sender_id})"
  # this only filter messages based on query with photo in it
  #async for message in ub.iter_messages(channel_id, search=query, filter=InputMessagesFilterPhotos):
  # will filter every message based on query
  async for message in ub.iter_messages(channel_id, search=query):
    text = message.raw_text
    msg_id = message.id 
    link = f"https://t.me/{channel_username}/{str(msg_id)}"
    btns.append([Button.url(text =f'{text[:20]}',url= link)])
  if btns == []:
    await event.reply(
            "Not found!")
  else:
    await event.reply(
        f"Hey {user}, Found some results..\n",
        buttons=keybtns)
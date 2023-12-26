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

from yourbot import app
from pyrogram import filters
import requests, os
from pyrogram.types import Message
import cloudinary as clp
from cloudinary import uploader

def uploadtocloudinary(file, _name):
    clp.config( # get it from cloudinary.com
        cloud_name = "",
        api_key = "",
        api_secret = "",
        secure = True
    )
    resp = uploader.upload(file, public_id = _name)
    return resp["url"]

@app.on_message(filters.command(["cloudinary", "uploadimage","upload"]))
async def cloudinary(client: app, message: Message):
    boa = await message.reply_text(f"Wait!")
    if not message.reply_to_message:
        await boa.edit("reply.. to.. an.. image..?")
        return
    if message.reply_to_message.document is False or message.reply_to_message.photo is False:
        return await boa.edit("reply to an image man!")
    if message.reply_to_message.document.file_size > 10485760 or message.reply_to_message.document.mime_type not in {"image/png","image/jpeg","image/jpg"}:
        return await boa.edit("file too large or not supported! (cloudinary)")
    if message.reply_to_message.video:
        return await boa.edit("videos are supported yet!")
    try:
        _id = ''
        _name = ''
        if message.reply_to_message.document and message.reply_to_message.document.mime_type in {"image/png","image/jpeg","image/jpg"}:
            _id = message.reply_to_message.document.file_id
            _name = message.reply_to_message.document.file_name
            print(1)
        if message.reply_to_message.photo:
            _id = message.reply_to_message.photo.file_id
            _name= "upload"
            print(2)
        if message.reply_to_message.sticker:
            _id = message.reply_to_message.sticker.file_id
            _name= "upload"
            print(2)
        if _name.startswith("./"):
            _name = _name.split("./")[1]
        print(_id, _name)
        downloaded_file = await pbot.download_media(
                _id,
                file_name= _name
            )
        uploaded_img_link = uploadtocloudinary(downloaded_file, _name)
        await message.reply_text(f"Uploaded Succcesfully and here's you [link]({uploaded_img_link})")
        await boa.delete()
        os.remove(f"./downloads/{_name}")
    except Exception as e:
        print(0)
        print(str(e))
        await boa.edit("something went wrong!")
        os.remove(f"./downloads/{_name}")

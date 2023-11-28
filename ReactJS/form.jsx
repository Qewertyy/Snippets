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

export function ContactUs() {
  const [state,setState] = useState(false);
  const [contactData, setContactData] = useState({
    name: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const validateForm = async () => {
    const { email,name, message } = contactData;
    const newErrors = {};
    if (!name) newErrors.name = "Please enter your name";
    if (!message) newErrors.message = "Please enter your message";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (await validateForm()) {
      // rest of your functionality
        setState(true);
        form.reset();
        setTimeout(() => {
          setState(false);
        }, 3000);
    };
  };
  return (
          <h2>Contact us</h2>
          <form onSubmit={handleSubmit}>
            {state && (<div>
              <p ff='inherit'>Message Sent, Thank you for contacting us!</p>
            </div>)}
            <TextInput
              label="Name"
              placeholder="Wh"
              required
              name="name"
              onChange={handleChange}
              error={errors.name}
              />
            <Textarea
              required
              label="Your message"
              placeholder="I want to enquire about.."
              name="message"
              onChange={handleChange}
              error={errors.message}
              />
              <button type="submit">Submit</button>
          </form>
  );
}

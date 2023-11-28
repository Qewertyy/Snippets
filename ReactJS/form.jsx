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

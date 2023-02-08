import React from 'react';
import axios from 'axios';

export default function Home(){
    const initialFormState = {
        symbol: "",
        start_date: "",
        end_date: "",
        email: ""
    };

    const [form, setForm] = React.useState(initialFormState);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    function sendRequest() {
        let data = {
            symbol: form.symbol,
            start_date: form.start_date,
            end_date: form.end_date,
            email: form.email
        };
      
        axios
            .post('/api/submit', data)
            .then(response => {
            //   setTutorial({
            //     id: response.data.id,
            //     title: response.data.title,
            //     description: response.data.description,
            //     published: response.data.published
            //   });
            //   setSubmitted(true);
              console.log(response);
            })
            .catch(e => {
              console.log(e);
            });
    }

    return(
        <div>
            <div>
                <label htmlFor="symbol">Company Symbol</label>
                <input 
                    type="text"
                    id="symbol"
                    name="symbol"
                    value={form.symbol}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="start_date">Start Date</label>
                <input 
                    type="text"
                    id="start_date"
                    name="start_date"
                    value={form.start_date}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="end_date">End Date</label>
                <input 
                    type="text"
                    id="end_date"
                    name="end_date"
                    value={form.end_date}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <button onClick={sendRequest}>Submit!</button>
            </div>
        </div>
    );
}
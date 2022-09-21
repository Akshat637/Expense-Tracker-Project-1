let email = document.querySelector('#emaillog');
let pwd = document.querySelector('#pwdlog');
let btnsubmit = document.querySelector('#btnlogin');


btnsubmit.addEventListener('click', (e) => {
    e.preventDefault();

    let email2 = email.value;
    let pwd2 = pwd.value;

    let obj = {
        email: email2,
        pwd: pwd2
    }


    const poost = async () => {
        try {
            const res = await axios.post("http://localhost:8400/login", obj)
            // console.log('yhi')


            if (res.status === 200) {
                alert('login successful')
    
            }
        }
        catch (err) {


            console.log(err);
        }
    }
    poost()
})
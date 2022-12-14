let dropoptions = document.querySelector(".dropoptions");
let droper = document.querySelector('#droper');
let amount1 = document.querySelector('#amount');
let category1 = document.querySelector("#category");
let description1 = document.querySelector('#description');
let userdeatail = document.querySelector('.userdetail');
let alertpopup = document.querySelector("#alertpopup");
let body = document.querySelector("body");
let subfeature = document.querySelector(".subfeatures");
let whitetheme = document.querySelector('#whitetheme');



let addexpensebtn = document.querySelector("#addexpensebtn");
addexpensebtn.addEventListener('click', (e) => {
  let token = localStorage.getItem("token");

  e.preventDefault();
  let amount = amount1.value;
  let category = category1.value;
  let description = description1.value;


  if (amount == "" || category == "" || description == "") {
    alertempty(e);
  }
  else {
    let obj = {
      amount: amount,
      category: category,
      description: description
    }

    axios.post("http://localhost:8400/addexpense", { obj }, { headers: { "authorization": token } })
      .then(result => {
        // console.log(result.data.result);
        getallexpenses();
        AlertItem(e);
        amount1.value = "";
        category1.value = "";
        description1.value = "";
      })
      .catch(err => {
        console.log(err);
      })

  }

});

document.addEventListener('DOMContentLoaded', () => {
  let token = localStorage.getItem("token");


  axios.get("http://localhost:8400/getuserdata", { headers: { "authorization": token } })
    .then(result => {

      if (result.data.suc == 'yes') {

        userdeatail.innerHTML = result.data.result[0].name.split(" ")[0];

      }

    })
    .then(err => {
      console.log(err);
    });

});
getallexpenses();


function getallexpenses() {
  let token = localStorage.getItem("token");

  axios
    .get("http://localhost:8400/getexpenses", {
      headers: { authorization: token },
    })
    .then((result) => {
      let allexp = "";
      console.log(result);

      for (let i = 0; i < result.data.result.length; i++) {
        let res = result.data.result[i];

        allexp += `
        <div class="singleexpense">
        <span class="gprice">${res.amount}</span>
        <span class="gcategory">${res.category}</span>
        <span class="gdescription">${res.description}</span>
        <button id=${res.id} style="background-color:red; float:right; color:white; border:none; padding:6px; margin-top:-8px;">Delete<i class="fa-solid fa-trash"></i></button>
        </div>
        `;
      }
      expensedetails.innerHTML = allexp;
    })
    .catch((err) => {
      console.log(err);
    });
};


function AlertItem(e) {
  const notification = document.createElement("div");
  notification.classList.add("notification");
  notification.innerHTML = `<h5>Congrats!Your Expense Added</h5>`;
  alertpopup.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 2800);
}


let logout = document.querySelector('#logout');
logout.addEventListener('click', () => {

  let result = confirm("Are You Sure !");
  if (result) {
    localStorage.clear();
    location.replace('login.html')
  }

});

let dropshow = document.querySelector('#dropshow');
dropshow.addEventListener('click', (e) => {
  dropoptions.style.display = 'block';
});

let hidedrop = document.querySelector("#hidedrop");
hidedrop.addEventListener("click", () => {
  dropoptions.style.display = "none";
});

document.addEventListener("DOMContentLoaded", () => {
  let token = localStorage.getItem("token");

  axios
    .get("http://localhost:8400/getuserdata", {
      headers: { authorization: token },
    })
    .then((result) => {
      if (result.data.result[0].issubcribed == true) {
        subfeature.innerHTML = `
     <li class="text-dark" id="subscriptiontheme" >Change Theme</li>
                  <li><a href="board.html" id="leaderboard">See Leaderboard</a></li>
             <li><a href="report.html" id="report">Get Expense Report</a></li>`;

        let subscriptiontheme = document.querySelector("#subscriptiontheme");
        let leaderboard = document.querySelector("#leaderboard");
        let report = document.querySelector("#report");

        subscriptiontheme.addEventListener("click", () => {
          body.style.backgroundColor = 'blue';
        });

      }
    })
    .then((err) => {
      console.log(err);
    });
});
let subscriptionbtn = document.querySelector('#buysub');
subscriptionbtn.addEventListener('click', buySubscription);

async function buySubscription(e) {
  let token = localStorage.getItem("token");

  e.preventDefault();
  const response = await axios.get("http://localhost:8400/subscription", {
    headers: { authorization: token },
  });
  console.log(response);
  var options = {
    key: response.data.key_id, // Enter the Key ID generated from the Dashboard
    name: "Akshat",
    order_id: response.data.order.id, // For one time payment
    prefill: {
      name: "Akshat",
      email: "ak@examgmail.com",
      contact: "6377928937",
    },
    theme: {
      color: "#528FF0",
    },
    // This handler function will handle the success payment
    handler: function (response) {
      console.log(response);
      axios
        .post(
          "http://localhost:8400/updatetransaction",
          {
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id,
          },
          { headers: { authorization: token } }
        )
        .then(() => {
          alert("You are a Premium User Now");
        })
        .catch(() => {
          alert("Something went wrong. Try Again!!!");
        });
    },
  };


  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response) {
    alert("payment failed");
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
  });

}

let expensedetails = document.querySelector(".expensedetails");
expensedetails.addEventListener('click', (e) => {
  let token = localStorage.getItem('token');

  if (e.target.classList.contains('fa-trash')) {
    let id = e.target.parentElement.id;
    axios.delete(
      `http://localhost:8400/delete/expense/${id}`,
      { headers: { authorization: token } }
    )
      .then((result) => {
        getallexpenses();
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(e.target.parentElement.id);
  }
})
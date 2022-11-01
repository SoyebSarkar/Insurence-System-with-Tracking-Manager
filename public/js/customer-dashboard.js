// Buttons
const dashboardBtn = document.querySelector(".dashboard-btn");
const policiesBtn = document.querySelector('.policies-btn');
const applyPoliciesBtn = document.querySelector('.apply-policies-btn');
const historyBtn = document.querySelector('.history-btn');
const askQsBtn = document.querySelector('.ask-qs-btn');
const logOutBtn = document.querySelector('.log-out-btn');

const NavigationButtons = [dashboardBtn,policiesBtn,applyPoliciesBtn,historyBtn,askQsBtn,logOutBtn];
// ----------------All Right Divs--------------------
const dashboardDiv =document.querySelector(".dashbord-div");
const yourPolicyDiv =document.querySelector(".your-policy");
const showPolicyDiv =document.querySelector(".show-policy");
const showHistoryDiv =document.querySelector(".show-history");
const askQsDiv =document.querySelector(".ask-qs");
const logoutDiv =document.querySelector(".logout-div");

const RightDivs =[dashboardDiv, yourPolicyDiv, showPolicyDiv,showHistoryDiv, askQsDiv, logoutDiv];


dashboardBtn.addEventListener('click',()=>{
    if(dashboardDiv.classList.contains('hide')){
        hideFromEveryOne();
        dashboardDiv.classList.toggle('hide');
        dashboardBtn.classList.toggle('press-btn');
    }
    
    
})
policiesBtn.addEventListener('click',()=>{
    if(yourPolicyDiv.classList.contains('hide')){
        hideFromEveryOne();
        yourPolicyDiv.classList.toggle('hide');
        policiesBtn.classList.toggle('press-btn');
    }
    
    
})
applyPoliciesBtn.addEventListener('click',()=>{
    if(showPolicyDiv.classList.contains('hide')){
        hideFromEveryOne();
        showPolicyDiv.classList.toggle('hide');
        applyPoliciesBtn.classList.toggle('press-btn');
    }
    
    
})
historyBtn.addEventListener('click',()=>{
    if(showHistoryDiv.classList.contains('hide')){
        hideFromEveryOne();
        showHistoryDiv.classList.toggle('hide');
        historyBtn.classList.toggle('press-btn');
    }
    
    
})
askQsBtn.addEventListener('click',()=>{
    if(askQsDiv.classList.contains('hide')){
        hideFromEveryOne();
        askQsDiv.classList.toggle('hide');
        askQsBtn.classList.toggle('press-btn');
    }
    
    
})
logOutBtn.addEventListener('click',()=>{
    if(logoutDiv.classList.contains('hide')){
        hideFromEveryOne();
        logoutDiv.classList.toggle('hide');
        logOutBtn.classList.toggle('press-btn');
    }
    
    
})



// Function for hiding Divs
const hideFromEveryOne = ()=>{
    
    for(let div of RightDivs){
        if(!div.classList.contains('hide')){
            div.classList.toggle('hide');
        
        }
    }
    for(let btn of NavigationButtons){
        if(btn.classList.contains('press-btn')){
            btn.classList.toggle('press-btn');
        
        }
        
    }

    
}
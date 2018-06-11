'use strict';
(function () {
    var pollId = window.location.pathname.split('/')[2];
    var apiUrl = appUrl + '/api/' + pollId + '/polls';
    var noPage = appUrl + '/404';
    var pollChart = document.getElementById("poll_chart").getContext('2d');
    var delButton = document.getElementById('delete');
    var pollCont = document.getElementById('poll_container');
    console.log(apiUrl);
    
    delButton.addEventListener('click', delPoll);
    
    function delPoll (e) {
        e.preventDefault();
        console.log('del');
        ajaxFunctions.ready(ajaxFunctions.ajaxRequest('DELETE', apiUrl, console.log(pollId + ' deleted')));
    }
    function addButton (name, id, form) {
       var button = document.createElement('button');
       button.setAttribute('id', id);
       button.innerHTML = name;
       form.appendChild(button);
       
    }
    
    function showOption (form, name, fieldId) {
       let option = document.createElement('input'),
           label = document.createElement('label'),
           id = fieldId.toString();
       
        option.setAttribute('type', 'radio');
        option.setAttribute('name', 'vote');
        option.setAttribute('value', id);
        option.setAttribute('id', 'opt' + id);
        label.setAttribute('for', 'opt' + id);
        label.innerHTML = name;
        form.appendChild(option);
        form.appendChild(label);
    }
    
    function parseChart (data) {
        console.log(data);
        var form = document.createElement('form'),
            chartData = JSON.parse(data),
            labels = [],
            votes = [];
        form.setAttribute('method', 'post');
        
        for (let i = 0; i < chartData.length; i++){
            showOption(form, chartData[i].fieldName, chartData[i]._id);
            labels.push(chartData[i].fieldName);
            votes.push(chartData[i].votes);
        }
        addButton('vote', 'vote_btn', form);
        pollCont.appendChild(form);
        
        var ctx = pollChart;
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: '# of Votes',
                    data: votes,
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                
            }
        });
    }
    
    function fail(status){
        if (status === 404){
            console.log('here');
            window.location.href = noPage;
        }
    }
    
    
    
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, parseChart, fail));

    
}) ();
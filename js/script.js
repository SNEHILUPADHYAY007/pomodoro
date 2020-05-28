

// module specifically for taking DOM elements:-
var UIController=(function(){
    
    //getting Dom elements
    return{
        getInput:function(){
            return{
                play:document.querySelector('.play'),
                pause:document.querySelector('.pause'),
                setting12:document.querySelector('.setting'),
                video:document.querySelector('.video-container video'),
                timeDisplay:document.querySelector('.showing-time'),
                icon:document.querySelector('.emoji'),
                icon2:document.querySelector('.emoji2'),
                drop:document.querySelectorAll('.dropdown-content button'),
                outline:document.querySelector('.moving-outline circle')

            }
        }
    }

})();



var centerController=(function(UICtrl){
    var countdown;
    //getting all the Dom elements.
    var DOM=UICtrl.getInput();
    var outlineLength = DOM.outline.getTotalLength();
    DOM.outline.style.strokeDashoffset = outlineLength;
    DOM.outline.style.strokeDasharray = outlineLength;
    
    //getting time input.
    var duration;
    var check=DOM.drop;
    
    check.forEach(option=>{
        option.addEventListener('click',function(){
            duration=this.getAttribute("data-time");
            DOM.timeDisplay.textContent=`${Math.floor(duration/60)}:  ${Math.floor(duration%60)<10?'0':''}${Math.floor(duration%60)}`;
            DOM.video.play();
            timer(duration);
        })
    })

    //play button
    var play=DOM.play;
    play.addEventListener('click',function(){
        checkPlay();
    })
    function checkPlay(){
        //DOM.video.play();
        console.log(DOM.video.paused);
        if(z){
            DOM.video.play();
            var duration_new=secondsLeft;
            timer(duration_new-(elapsedSeconds));
            
        }
        else{
            var x=DOM.icon;            
            alert(`Sorry to say but nothing is set so, first set some timer for u then play!${x.innerText="😅😅😅😅😅"}`);
        }
    }

    // pause button
    var pause=DOM.pause;
    
    pause.addEventListener('click',function(){
        checkPause();
        
        
    })
    var z;
    function checkPause(){
        if(DOM.video.played){
            if(countdown>0){
                clearInterval(countdown);
                elapsedTimePause();
                DOM.video.pause();
                z=true;
            }
            else{
                z=DOM.video.pause()
                z=false;
                console.log(z);
                alert('nothing to pause');
                
            }
            
            //clearInterval();
        }
        
    }

    //function to check time elapsed while pause
    var elapsedSeconds;
    var fig;
    function elapsedTimePause(){
        clearInterval(fig);
        elapsedSeconds=0;    
        fig=setInterval(function(){
             elapsedSeconds++;
        },1000);
         
    }

    // ontimeUpdate
    var secondsLeft;
    function timer(seconds){
        clearInterval(countdown);
        var now=Date.now();
        var then=now+seconds*1000;
        displayTime(seconds);
        countdown=setInterval(function(){
            secondsLeft=Math.round((then-Date.now())/1000);
            //to stop
            if(secondsLeft<0){
                clearInterval(countdown);
                return;
            }
            //display the time on DOM
            displayTime(secondsLeft);
            // console.log(secondsLeft);
            
        },1000);
        
        
    }
    function displayTime(seconds){
        var minutes=Math.floor(seconds/60);
        var remainderSecond=(seconds%60);
        const display=`${minutes}:  ${remainderSecond<10?'0':''}${remainderSecond}`;
        DOM.timeDisplay.textContent=display;
        document.title=`${DOM.icon2.innerText='⏰'}  ${display}`;
        var progress = outlineLength - (seconds / duration) * outlineLength;
        DOM.outline.style.strokeDashoffset = progress;

        

    }


    
    
    //initial setup
    return{
        init:function(){
            
            DOM.timeDisplay.textContent=`${0}:  ${0}${0}`;
            
        }
    }

})(UIController);

//calling init function
centerController.init();
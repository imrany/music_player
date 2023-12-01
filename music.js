let music=new Audio('audio');
// music.play();

const songs = [
    {
        id: "1",
        poster: "Images1/ig1.jpeg",
        singer:"Chris Tomlin",
        songTitle:"Good Good Father",
    },
    {
        id: "2",
        poster: "Images1/ig2.jpeg",
        singer:"Ninna Moo",
        songTitle:"Heroes",
    },
    {
        id: "3",
        poster: "Images1/ig3.jpeg",
        singer:"Mii",
        songTitle:"Current World",
    },
    {
        id: "4",
        poster: "Images1/ig4.jpeg",
        singer:"Micheal W.Smith",
        songTitle:"I surrender",
    },
    {
        id: "5",
        poster: "Images1/ig5.jpeg",
        singer:"Alan Walker",
        songTitle:"Fade",

    },
    {
        id: "6",
        poster: "Images1/ig6.jpeg",
        singer:"Don Moen",
        songTitle:"I will sing",
    }
]


//  search data
let search_results = document.getElementsByClassName('search_results')[0];
let menu_song=document.getElementsByClassName('menu-song')[0]
const content=document.getElementsByClassName("content")[0]
// let counter=window.location.reload()?++1:0

let counter=0
content.innerHTML=`
<h1>${songs[counter].singer}-${songs[counter].songTitle}</h1>
<p>
    You were the shadow to my light did oyu feel us Another start you fade away <br> 
    Afraid our aims is out of sight wanna see us Alive
</p>
<div class="buttons">
    <button class="playListPlay" id="${songs[counter].id}">PLAY</button>
    <button>FOLLOW</button>
</div>
`

songs.forEach(element =>{
    const {id, songTitle,singer, poster} = element;
    //console.log(songName);
    let card = document.createElement('a');
    card.classList.add('card');
    card.href = "#" + id;
    card.innerHTML = `
    <img src="${poster}" alt="">
    <div class="content">
        ${songTitle}<br>
        <div class="subtitle">${singer}</div>
    </div>
    `;

    let menu = document.createElement('li');
    menu.classList.add("songItem")
    menu.innerHTML=`
    <span>0${id}</span>
    <img src="${poster}" alt="">
    <h5>${singer}<br>
        <div class="subtitle">${singer}</div>
    </h5>
    <i class="bi playListPlay bi-play-circle-fill" id="${id}"></i>
    `
    menu_song.appendChild(menu)
    search_results.appendChild(card);
});

let input = document.getElementsByTagName('input')[0];

input.addEventListener('keyup', ()=>{
    let input_value = input.value.toUpperCase();
    let items = search_results.getElementsByTagName('a');

    for(let index = 0; index < items.length; index++){
        let as = items[index].getElementsByClassName('content')[0];
        let text_value = as.textContent || as.innerHTML;

        if(text_value.toUpperCase().indexOf(input_value) > - 1){
            items[index].style.display = "flex";
        } else {
            items[index].style.display = "none";
        }

        if (input.value == 0) {
            search_results.style.display = "none";
        } else{
            search_results.style.display = "none";
        }
    }
})
// search data

let masterplay = document.getElementById('masterplay');
let wave = document.getElementById('wave');
let pop_song=document.querySelector('.pop_song')

songs.forEach((song)=>{
    pop_song.innerHTML+=`
    <li class="songItem">
        <div class="img_play">
            <img src="./Images1/ig${song.id}.jpeg" alt="">
            <i class="bi playListPlay bi-play-circle-fill" id="${song.id}"></i>
        </div>
        <h5>${song.singer}<br>
            <div class="subtitle">${song.songTitle}</div>
        </h5>
    </li>
    `
})

masterplay.addEventListener('click', ()=>{
    if (music.paused || music.currentTime <= 0){
        music.play();
        wave.classList.add('active1');
        masterplay.classList.remove('bi-play-fill');
        masterplay.classList.add('bi-pause-fill');
    } else {
        music.pause();
        wave.classList.remove('active1');
        masterplay.classList.add('bi-play-fill');
        masterplay.classList.remove('bi-pause-fill');
    }
});

const makeAllplays = () =>{
    Array.from(document.getElementsByClassName('playListPlay')).forEach((el)=>{
        el.classList.add('bi-play-circle-fill');
        el.classList.remove('bi-pause-circle-fill');
    })
}
const makeAllBackground = () =>{
    Array.from(document.getElementsByClassName('songItem')).forEach((el)=>{
        el.style.background = 'rgb(105, 105, 105, .0)';
    })
}

let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let download_music = document.getElementById('download_music');
let title = document.getElementById('title');

Array.from(document.getElementsByClassName('playListPlay')).forEach((e,i)=>{
    e.addEventListener('click', (el)=>{
        index = el.target.id;
        console.log(e.id);
        music.src = `audio/${index}.mp3`;
        poster_master_play.src = `img/${index}.jpeg`;
        music.play();
        masterplay.classList.remove('bi-play-fill');
        masterplay.classList.add('bi-pause-fill');
        download_music.href = `audio/${index}.mp3`;

        let songTitles = songs.filter((els) =>{
            return els.id == index;
        });

        songTitles.forEach(elss =>{
            let {songTitle,singer} = elss;
            title.innerHTML = `
            ${songTitle}<br>
            <div class="subtitle">${singer}</div>
            `;
            download_music.setAttribute('download', songName);
        });

        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background ="rgb(105, 105, 105, .1)";
        makeAllplays();
        el.target.classList.remove('bi-play-circle-fill');
        el.target.classList.add('bi-pause-circle-fill');
        wave.classList.add('active1');
    });
})


let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot');

music.addEventListener('timeupdate', ()=>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min1 = Math.floor(music_dur / 60);
    let sec1 = Math.floor(music_dur % 60);

    // console.log(min1);
    if (sec1 < 10) {
        sec1 = `0${sec1}`;
    }
    currentEnd.innerText = `${min1}:${sec1}`;

    let min2 = Math.floor(music_curr / 60);
    let sec2 = Math.floor(music_curr % 60);
    if (sec2 < 10) {
        sec2 = `0${sec2}`;
    }
    currentStart.innerText = `${min2}:${sec2}`;

     let progressBar = parseInt((music_curr / music_dur) * 100);
     seek.value = progressBar;
    //  console.log(seek.value);
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
});

seek.addEventListener('change', ()=>{
    music.currentTime = seek.value * music.duration / 100;
});

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_bar = document.getElementsByClassName('vol_bar')[0];
let vol_dot = document.getElementById('vol_dot');

vol.addEventListener('change', ()=>{
    if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-off-fill');
    }
    if (vol.value > 0) {
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-off-fill');
    }
    if (vol.value > 50) {
        vol_icon.classList.add('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-off-fill');
    }
    let vol_a = vol.value;
    vol_bar.style.width = '${vol_a}%';
    vol_dot.style.left = '${vol_a}%';
    music.volume = vol_a / 100;
});

let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', ()=>{
    index -= 1;
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src = `audio/${index}.mp3`;
    poster_master_play.src = `img/${index}.jpeg`;
    music.play();
    masterplay.classList.remove('bi-play-fill');
    masterplay.classList.add('bi-pause-fill');

    let songTitles = songs.filter((els) =>{
        return els.id == index;
    });

    songTitles.forEach(elss =>{
        let {songName} = elss;
        title.innerHTML = songName;
    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background ="rgb(105, 105, 105, .1)";
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
})

next.addEventListener('click', ()=>{
    index ++;
    if (index > Array.from(document.getElementsByClassName('songItem')).length) {
        index = 1;
    }
    music.src = `audio/${index}.mp3`;
    poster_master_play.src = `img/${index}.jpeg`;
    music.play();
    masterplay.classList.remove('bi-play-fill');
    masterplay.classList.add('bi-pause-fill');

    let songTitles = songs.filter((els) =>{
        return els.id == index;
    });

    songTitles.forEach(elss =>{
        let {songName} = elss;
        title.innerHTML = songName;
    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background ="rgb(105, 105, 105, .1)";
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
})


let pop_song_left = document.getElementById('pop_song_left');
let pop_song_right = document.getElementById('pop_song_right');


pop_song_right.addEventListener('click', ()=>{
    pop_song.scrollLeft +=330;
})
pop_song_left.addEventListener('click', ()=>{
    pop_song.scrollLeft -=330;
})

let pop_art_left = document.getElementById('pop_art_left');
let pop_art_right = document.getElementById('pop_art_right');
let Artists_bx = document.getElementsByClassName('Artists_bx')[0];


pop_art_right.addEventListener('click', ()=>{
    Artists_bx.scrollLeft +=330;
});
pop_art_left.addEventListener('click', ()=>{
    Artists_bx.scrollLeft -=330;
});


let shuffle = document.getElementsByClassName('shuffle')[0];

shuffle.addEventListener('click', ()=>{
    let a = shuffle.innerHTML;

    switch (a) {
        case "next":
            shuffle.classList.add('bi-arrow-repeat');
            shuffle.classList.remove('bi-music-note-beamed');
            shuffle.classList.remove('bi-shuffle');
            shuffle.innerHTML = 'repeat';
            break;
        case "repeat":
            shuffle.classList.remove('bi-arrow-repeat');
            shuffle.classList.remove('bi-music-note-beamed');
            shuffle.classList.add('bi-shuffle');
            shuffle.innerHTML = 'random';
            break;
        case "random":
            shuffle.classList.remove('bi-arrow-repeat');
            shuffle.classList.add('bi-music-note-beamed');
            shuffle.classList.remove('bi-shuffle');
            shuffle.innerHTML = 'next';
            break;
    }
});


const next_music = () =>{
    if (index == songs.length) {
        index = 1
    } else {
        index++;
    }
    music.src = `audio/${index}.mp3`;
    poster_master_play.src = `img/${index}.jpeg`;
    music.play();
    masterplay.classList.remove('bi-play-fill');
    masterplay.classList.add('bi-pause-fill');
    download_music.href = `audio/${index}.mp3`;

    let songTitles = songs.filter((els) =>{
        return els.id == index;
    });

    songTitles.forEach(elss =>{
        let {songName} = elss;
        title.innerHTML = songName;
        download_music.setAttribute('download', songName);
    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background ="rgb(105, 105, 105, .1)";
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
}
const repeat_music = () =>{
    index;
    music.src = `audio/${index}.mp3`;
    poster_master_play.src = `img/${index}.jpeg`;
    music.play();
    masterplay.classList.remove('bi-play-fill');
    masterplay.classList.add('bi-pause-fill');
    download_music.href = `audio/${index}.mp3`;

    let songTitles = songs.filter((els) =>{
        return els.id == index;
    });

    songTitles.forEach(elss =>{
        let {songName} = elss;
        title.innerHTML = songName;
        download_music.setAttribute('download', songName);
    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background ="rgb(105, 105, 105, .1)";
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
}
const random_music = () =>{
    if (index == songs.length) {
        index = 1
    } else {
        index = Math.floor((Math.random() * songs.length) + 1);
    }
    music.src = `audio/${index}.mp3`;
    poster_master_play.src = `img/${index}.jpeg`;
    music.play();
    masterplay.classList.remove('bi-play-fill');
    masterplay.classList.add('bi-pause-fill');
    download_music.href = `audio/${index}.mp3`;

    let songTitles = songs.filter((els) =>{
        return els.id == index;
    });

    songTitles.forEach(elss =>{
        let {songName} = elss;
        title.innerHTML = songName;
        download_music.setAttribute('download', songName);
    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background ="rgb(105, 105, 105, .1)";
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
}


music.addEventListener('ended', ()=>{
    let b = shuffle.innerHTML;

    switch (b) {
        case 'repeat':
            repeat_music();
            break;
        case 'next':
            next_music();
            break;
        case 'random':
            random_music();
            break;
    }
});

// document.querySelectorAll('.songItem').forEach((e, i)=>{
//     e.getElementsByTagName('img')[0].src = songs[i].poster;
//     e.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
// })
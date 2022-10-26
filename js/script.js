let btn = document.querySelector('#menu');
let sidebar = document.querySelector('.sidebar');


btn.addEventListener('click', function() {
    sidebar.classList.toggle('open');
})


let api_key = "AIzaSyBn_bGf7UaPtHFd2LoTYjDDHMwtAJ6brw0";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";
let videoCardContainer = document.querySelector('.video_grid');

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'RU' 

}) )
.then(res=> res.json())
.then(data=> {
    console.log(data);
    data.items.forEach(item => {
        getChannelIcon(item);
    })
}).catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch (channel_http + new URLSearchParams({
        key: api_key,
        part:  'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        // console.log(video_data);
        makeVideoCard(video_data)        
    } )

    const makeVideoCard = (data) => {
        videoCardContainer.innerHTML += `
        <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
            <div class="thumbnail">
                <img src="${data.snippet.thumbnails.high.url}" alt="">
            </div>
            <div class="details">
                <div class="author">
                    <img src="${video_data.channelThumbnail}" alt="">
                </div>
                <div class="text">
                    <h3>${data.snippet.title}</h3>
                    <span>${data.snippet.channelTitle}</span>
                </div>
            </div>
        </div> 
        `
    }
}
 

// search
const searchInput = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    location.href = searchLink + searchInput.value;
});
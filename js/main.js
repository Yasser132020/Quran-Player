


// select elements

let surahsContainer = document.querySelector('.surahs');

let audio = document.querySelector('.QuranPlayer');

let ayah = document.querySelector('.ayah');

let next = document.querySelector('.next');

let play = document.querySelector('.play');

let prev = document.querySelector('.prev');


getSurahs()
function getSurahs()
{
    // fetch To Get Surahs Data
    
    fetch(`https://api.quran.sutanlab.id/surah`)

    .then(response => response.json())

    .then(data => {

        // console.log(data.data)

        for (const surah in data.data) 
        {
            surahsContainer.innerHTML +=
            `
                <div>
                    <p>${data.data[surah].name.long}</p>
                    <p>${data.data[surah].name.transliteration.en}</p>
                </div>
            `
            // console.log(data.data[surah].name.long);
            // console.log(data.data[surah].name.transliteration.en);
        }

        // select all surahs

        let allSurahs = document.querySelectorAll('.surahs > div');

        ayahsAudios = [];

        ayahsText = [];

        ayahIndex = 0;

        allSurahs.forEach((surah,index) => {

            surah.addEventListener('click',() => {

                fetch(`https://api.quran.sutanlab.id/surah/${index + 1}`)

                .then(response => response.json())

                .then(data => {

                    ayahsAudios = [];

                    ayahsText = [];

                    let verses = data.data.verses;

                    verses.forEach(verse => {

                        ayahsAudios.push(verse.audio.primary);

                        ayahsText.push(verse.text.arab);

                    })

                    let ayahIndex = 0;

                    changeAyah(ayahIndex);

                    audio.addEventListener('ended',() => {

                        ayahIndex++;

                        if(ayahIndex < ayahsAudios.length)
                        {
                            changeAyah(ayahIndex);
                        }
                        else
                        {
                            ayahIndex = 0;

                            changeAyah(ayahIndex);

                            audio.pause();

                            alert('Surah has Been Ended');

                            isPlaying = true;
                            togglePlay();
                        }
                        
                    })

                    // Handle next and prev

                    next.addEventListener('click',() => {

                        ayahIndex < ayahsAudios.length - 1 ? ayahIndex++ : ayahIndex = 0;

                        changeAyah(ayahIndex);

                    })

                    
                    prev.addEventListener('click',() => {

                        ayahIndex == 0 ? ayahIndex =  ayahsAudios.length - 1 : ayahIndex--;

                        changeAyah(ayahIndex);
                        
                    })


                    // Handle play and pause sudio

                    let isPlaying = false;

                    togglePlay()

                    function togglePlay()
                    {
                        if(isPlaying == true)
                        {
                            audio.pause();

                            play.innerHTML = `<i class="fas fa-play"></i>`;

                            isPlaying = false;

                        }
                        else
                        {
                            audio.play();

                            play.innerHTML = `<i class="fas fa-pause"></i>`;

                            isPlaying = true;
                        }
                    }

                    play.addEventListener('click',togglePlay);

                    function changeAyah()
                    {
                        audio.src = ayahsAudios[ayahIndex];

                        ayah.innerHTML = ayahsText[ayahIndex];

                    }
                    


                })
            })
        })
    })
}
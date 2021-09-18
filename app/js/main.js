(() => {
  const app = {
    initialize () {
      console.log('1. Application started!');
      this.cacheElements();
      this.buildUI();
      this.clickEventListeners();
    },

    cacheElements () {
      console.log('2. Cache Elements!');
      this.$nav = document.querySelector('.nav');
      this.$burger = document.querySelector('.burger');
      this.$lineUp = document.querySelector('.lineUp');
      this.$artistSelected = document.querySelector('.artiesten--selected');
      this.$lineUpFilter = document.querySelectorAll('.lineUp--filter');
      this.$timer = document.querySelector('.timer');
      this.$social = document.querySelector('.social');
    },

    buildUI () {
      console.log('3. Build the user interface');
      this.$nav.innerHTML = this.generateNav();
      this.$lineUp.innerHTML = this.generateHTMLForArtiesten();
      this.$timer.innerHTML = this.generateHTMLForTimer();
      this.$social.innerHTML = this.generateSocial();
      setInterval(() => { this.ticking(); }, 1000);
    },

    generateNav () {
      let tempStr = '';
      tempStr = nav.map(navigation => `
        <ul class="navList">
          <li class="navLink"><a href="${navigation.link}">${navigation.name}</a></li>
        </ul>`).join('');
      return tempStr;
    },

    clickEventListeners () {
      const $artistList = this.$lineUp.querySelectorAll('.artiesten');
      console.log($artistList);
      let $artiesten;
      for (let i = 0; i < $artistList.length; i++) {
        $artiesten = $artistList[i];
        console.log($artiesten);
        $artiesten.addEventListener('click', (event) => {
          const id = event.target.dataset.id || event.target.parentNode.dataset.id;
          this.showAndHideArtistDetails(this.showArtistById(id));
          document.body.style.position = 'fixed';
        });
      }
      this.$lineUpFilter.forEach(($filterDate) => {
        $filterDate.addEventListener('click', (event) => {
          this.filterDays(event.target.dataset.day);
        });
      });
      this.$burger.addEventListener('click', (event) => {
        this.$nav.classList.toggle('nav-active');
      });
    },

    generateHTMLForArtiesten () {
      let tempStr = '';
      tempStr = lineUp.map(article => `
        <div class="artiesten" data-id="${article.id}" data-day="${article.from}">
        <img src="${article.artist.picture.large}">
        <h2 class"artiesten__naam">${article.artist.name}</h2>
        <div class="container__playday__place">
          <div class="artiesten__playday">
            <p>${this.concertPlayDay(article.from)}</p>
          </div>
          <div class="artiesten__place">
            <p>${article.place.name}</p>
          </div>
        </div>
        </div>
        `).join('');
      return tempStr;
    },

    generateHTMLForDetail (artistDetails) {
      let tempStr = '';
      tempStr += `
      <div class="outer--container--details">
      <button id="closing--button"><svg id="Capa_1" enable-background="new 0 0 386.667 386.667" height="512" viewBox="0 0 386.667 386.667" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m386.667 45.564-45.564-45.564-147.77 147.769-147.769-147.769-45.564 45.564 147.769 147.769-147.769 147.77 45.564 45.564 147.769-147.769 147.769 147.769 45.564-45.564-147.768-147.77z"/></svg></button> 
      <div class="inner--container--details">
      
      <img src="${artistDetails.artist.picture.large}">

      <h2 class"artiesten__naam">${artistDetails.artist.name}</h2>
        <div class="container__playday__place">
          <div class="artiesten__playday">
            <p>${this.concertPlayDay(artistDetails.from)}</p>
          </div>
          <div class="artiesten__place">
            <p>${artistDetails.place.name}</p>
          </div>
        </div>

      <p>${artistDetails.artist.synopsis}</p> 
      <iframe width="100%" height="502" src="${artistDetails.artist.media[0].sourceId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <h3 class="artiesendetails--meer--weten">Meer weten?</h3>
      <ul>
        <li><a href="${artistDetails.artist.social.website}">${artistDetails.artist.social.website}</a></li>
        <li><a href="${artistDetails.artist.social.facebook}">${artistDetails.artist.social.facebook}</a></li>
        <li><a href="${artistDetails.artist.social.twitter}">${artistDetails.artist.social.twitter}</a></li>
        <li><a href="${artistDetails.artist.social.instagram}">${artistDetails.artist.social.instagram}</a></li>
      </ul>
      </div>
      </div>`;
      return tempStr;
    },

    showArtistById (id) {
      return lineUp.find(artist => (artist.id === id));
    },

    showAndHideArtistDetails (details) {
      // console.log(artist)
      this.$artistSelected.innerHTML = this.generateHTMLForDetail(details);

      this.$closingButton = document.querySelector('#closing--button');

      this.$closingButton.addEventListener('click', (event) => {
        this.$artistSelected.innerHTML = '';
        document.body.style.position = 'static';
      });
    },

    filterDays (dag) {
      console.log(dag)
      const $artiestenInHTML = this.$lineUp.querySelectorAll('.artiesten');
      console.log($artiestenInHTML)
      $artiestenInHTML.forEach(($artiest, index) => {
        const playday = this.concertPlayDay(parseInt($artiest.dataset.day));
        console.log(playday)
        if (dag !== 'all') {
          if (dag === playday) {
            $artiest.classList.remove('verborgen');
          } else {
            $artiest.classList.add('verborgen');
          }
        } else {
          $artiest.classList.remove('verborgen');
        }
      });
    },

    concertPlayDay (millisToDay) {
      console.log(millisToDay)
      return new Date(millisToDay).toLocaleString('nl-BE', { weekday: 'long' });
    },

    generateHTMLForTimer () {
      const aftelklok = new Date(1625148000000) - new Date();
      const dagen = Math.floor(aftelklok / (1000 * 60 * 60 * 24));
      const uren = Math.floor(
        (aftelklok % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minuten = Math.floor((aftelklok % (1000 * 60 * 60)) / (1000 * 60));
      const seconden = Math.floor((aftelklok % (1000 * 60)) / 1000);
      // this.$timer = document.querySelector('.timer');
      // this.$timer.innerHTML = `${dagen} dagen ${uren}H ${minuten}M ${seconden}S`;
      return `${dagen} dagen ${this.toAmountOfDigits(uren, 2)}H ${this.toAmountOfDigits(minuten, 2)}M ${this.toAmountOfDigits(seconden, 2)}S`;
    },

    toAmountOfDigits (number, amount) {
      let str = String(number);
      while (str.length < amount) {
        str = `0${str}`;
      }
      return str;
    },

    ticking () {
      this.$timer.innerHTML = this.generateHTMLForTimer();
    },

    generateSocial () {
      let tempStr = '';
      tempStr = social.map(socialMedia => `
        <ul class="socialList">
          <li class="socialLink"><a href="${socialMedia.link}">${socialMedia.name}</a></li>
        </ul>`).join('');
      return tempStr;
    },
  };
  app.initialize();
})();

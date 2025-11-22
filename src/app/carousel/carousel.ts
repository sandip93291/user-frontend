import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: false,
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
})
export class Carousel {
  data = [
    {
      img: 'https://qfinance.in/assets/images/form/dont-pay-interest-05-11-2025.svg',
      title: "Discover What Your Q Report Reveals About Your Finances",
      subTitle: 'See how Q tracks your loans, cards & EMIs <br> and helps you save smarter.',
      btn1: 'Generate QR Report',
      btn2: 'Watch Video'
    },
    {
      img: 'https://qfinance.in/assets/images/form/dont-pay-interest-05-11-2025.svg',
      title: 'Discover What Your Q Report Reveals About Your Financey',
      subTitle: 'See how Q tracks your loans, cards & EMIs <br> and helps you save smarter.',
      btn1: 'Get Started',
      btn2: 'Watch Video'
    },
    {
      img: 'https://qfinance.in/assets/images/form/dont-pay-interest-05-11-2025.svg',
      title: 'Discover What Your Q Report Reveals About Your Finances',
      subTitle: 'See how Q tracks your loans, cards & EMIs <br> and helps you save smarter.',
      btn1: 'Learn More',
      btn2: 'Watch Video'
    }
  ];

  currentIndex = 0;

  ngOnInit() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.data.length;
    }, 4000);
  }

  changeSlide(i: number) {
    this.currentIndex = i;
  }


}

module.exports = {
  /** Site MetaData (Required all)*/
  title:  'development note',               // (* Required)
  description: 'bbrubi development blog',   // (* Required)
  author: 'bbrubi',                         // (* Required)
  language: 'ko-KR',                        // (* Required) html lang, ex. 'en' | 'en-US' | 'ko' | 'ko-KR' | ...
  siteUrl: 'https://bbrubidev.github.io',                      // (* Required)

  /** Header */
  profileImageFileName: 'profile.png', // include filename extension ex.'profile.jpg'
    // The Profile image file is located at path "./images/"
    // If the file does not exist, it is replaced by a random image.

  /** Home > Bio information*/
  comment: 'Web Backend Developer',
  // name: 'Seonjeong Hwang',
  company: '',
  location: 'Korea',
  email: 'chosenn511@gmail.com',
  website: 'https://github.com/chosenn511/chosenn511.github.io.git',
  linkedin: '',
  facebook: '',
  instagram: '',
  github: 'https://github.com/chosenn511',

  /** Post */
  enablePostOfContents: true,     // TableOfContents activation (Type of Value: Boolean. Not String)
  disqusShortname: 'chosenn511',   // comments (Disqus sort-name)
  enableSocialShare: true,        // Social share icon activation (Type of Value: Boolean. Not String)

  /** Optional */
  googleAnalytics: '',     // Google Analytics TrackingID. ex.'UA-123456789-0'
  googleSearchConsole: '', // content value in HTML tag of google search console ownership verification. ex.'w-K42k14_I4ApiQKuVPbCRVV-GxlrqWxYoqO94KMbKo'
  googleAdsenseSlot: '',   // Google Adsense Slot. ex.'5214956675'
  googleAdsenseClient: '', // Google Adsense Client. ex.'ca-pub-5001380215831339'
    // Please correct the adsense client number(ex.5001380215831339) in the './static/ads.txt' file.
};

import React from "react";
import {
    FacebookShareButton,
    
    LinkedinShareButton,
    TwitterShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    PinterestShareButton,
    VKShareButton,
    OKShareButton,
    RedditShareButton,
    TumblrShareButton,
    LivejournalShareButton,
    MailruShareButton,
    ViberShareButton,
    WorkplaceShareButton,
    EmailShareButton,
  } from 'react-share';

  import {
    FacebookShareCount,
    GooglePlusShareCount,
    LinkedinShareCount,
    PinterestShareCount,
    VKShareCount,
    OKShareCount,
    RedditShareCount,
    TumblrShareCount,
  } from 'react-share';

  import {
    FacebookIcon,
    TwitterIcon,
    TelegramIcon,
    WhatsappIcon,
    LinkedinIcon,
    PinterestIcon,
    VKIcon,
    OKIcon,
    RedditIcon,
    TumblrIcon,
    LivejournalIcon,
    MailruIcon,
    ViberIcon,
    WorkplaceIcon,
    LineIcon,
    PocketIcon,
    InstapaperIcon,
    EmailIcon,
  } from 'react-share';


  export default function Share() {

   const url = String(window.location);
   const title = "Steadylearner Website";
   const size = "2.5rem"

    return (
      <div>
        <li
        className="network"
      >
        <FacebookShareButton
         className="network__share-button"
         url={url}
         quote={title}
        >
          <FacebookIcon
            size={size}
          />
        </FacebookShareButton>
      </li>
      <li
        className="network"
      >
        <TwitterShareButton
          className="network__share-button"
          url={url}
          title={title}
        >
          <TwitterIcon
            size={size}
          />
        </TwitterShareButton>
      </li>

      <li
        className="network"
      >
        <EmailShareButton
         className="network__share-button"
         url={url}
         quote={title}
        >
          <EmailIcon
            size={size}
          />
        </EmailShareButton>
      </li>
      <li
        className="network"
      >
        <LinkedinShareButton
          className="network__share-button"
          url={url}
          title={title}
        >
          <LinkedinIcon
            size={size}
          />
        </LinkedinShareButton>
      </li>

      <li
        className="network"
      >
        <TelegramShareButton
         className="network__share-button"
         url={url}
         quote={title}
        >
          <TelegramIcon
            size={size}
          />
        </TelegramShareButton>
      </li>
      <li
        className="network"
      >
        <WhatsappShareButton
          className="network__share-button"
          url={url}
          title={title}
        >
          <WhatsappIcon
            size={size}
          />
        </WhatsappShareButton>
      </li>
      </div>
    );
  }


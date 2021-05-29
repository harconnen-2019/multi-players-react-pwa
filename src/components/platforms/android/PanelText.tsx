import React from 'react'

import { IRadio } from '../../../interfaces/radio'

interface Props {
  text: string
  radio: IRadio | undefined
}

const PanelText = ({ text, radio }: Props) => {
  return (
    <section>
      {text === 'terms' ? (
        <>
          <p>Privacy Policy</p>
          <p>
            When you use our player <b>{radio?.name}</b> you’re trusting us with
            your information. We understand this is a big responsibility and
            work hard to protect your information and put you in control.
          </p>
          <p>
            This Privacy Policy is meant to help you understand what information
            we collect, why we collect it, and how you can update, manage,
            export, and delete your information.
          </p>
          <p>
            We collect information to provide better services to all our
            partners and users вЂ” from figuring out basic stuff like which
            language you speak, to more complex things like which ads you’ll
            find most useful, or which music and audio files you might like. The
            information we collect, and how that information is used, depends on
            how you use our services.
          </p>
          <p>
            We store the information we collect with our players, also with
            unique identifiers tied to the browser, application, or device
            you’re using. This helps us to offer better features and do things
            like maintain your language preferences across browsing sessions,
            region, location, gender, content preferences, ads you may like or
            dislike.
          </p>
          <p>
            We collect information about the apps, browsers, and devices you
            use, which helps us provide features like automatic product updates.
          </p>
          <p>
            The information we collect includes unique identifiers, browser type
            and settings, device type and settings, operating system, mobile
            network information including carrier name and phone number, and
            application version number. We also collect information about the
            interaction of your apps, browsers, and devices with our services,
            including IP address, crash reports, system activity, and the date,
            time, and referrer URL of your request.
          </p>
          <p>
            We collect this information when you are using our services and apps
            on your device contacts our servers. This information includes
            things like your device type, carrier name, crash reports, and which
            apps you've installed.
          </p>
          <p>
            We collect information about your activity in our players, which we
            use to do things like recommend music you might like. The activity
            information we collect may include: views and interactions with
            content and ads, audios you are listening to.
          </p>
          <p>
            We use the information we collect to customize our services for you,
            including providing recommendations, personalized content, and ads.
          </p>
          <p>
            We use various technologies to collect and store information,
            including cookies, pixel tags, local storage, such as browser web
            storage or application data caches, databases, and server logs.
          </p>
          <p>
            We use data for analytics and measurement to understand how our
            players are used. And we also use data about the ads you interact
            with to help advertisers understand the performance of their ad
            campaigns. We use a variety of tools to do this
          </p>
          <p>
            We use different technologies to process information for these
            purposes. We use automated systems that analyze content to provide
            you with things like personalized ads, or other features tailored to
            how you use our players. And we analyze your content to help us
            detect abuse such as spam, malware, and illegal content. We also use
            algorithms to recognize patterns in data.
          </p>
          <p>
            We may combine the information we collect among our services and
            across your devices for the purposes described above.
          </p>
        </>
      ) : (
        <>
          <p>
            1. Welcome to <b>{radio?.name}</b> Player!
          </p>
          <p>Thanks for your interest in our Player!</p>
          <p>
            By using our Player, you agree to these Terms of Service, Please
            read these Terms of Service carefully.
          </p>
          <p>
            As used in these Terms of Service, "you" or "publisher" means the
            individual or entity using the Player (and/or any individual, agent,
            employee, representative, network, parent, subsidiary, affiliate,
            successor, related entities, assigns, or all other individuals or
            entities acting on your behalf), at your direction, under your
            control, or under the direction or control of the same individual or
            entity who controls you. "We," "us" means <b>{radio?.name}</b>{' '}
            Player, and the "parties" means you and us.
          </p>
          <p>2. Access to the Player</p>
          <p>
            While you are using our Player you agree with this Terms. We have
            the right to refuse or limit your access to the Player. In order to
            verify your person, from time-to-time we may ask for additional
            information from you, including, but not limited to, verification of
            your name, address, and other identifying information.
          </p>
          <p>
            By using the Player, you permit to serve, as applicable,
            advertisements and other content ("Ads"), mobile applications, media
            players, mobile content, and/or other properties approved by us
            (each individually a "Property"). In addition, you grant us the
            right to access, index and cache the Properties, or any portion
            thereof, including by automated means. We may refuse to provide the
            Services to any Property.
          </p>
          <p>
            Any Property that is a software application and accesses our Player
            may require preapproval by us in writing.
          </p>
          <p>3. Using our Player</p>
          <p>
            You may use our Player only as permitted by this the Terms and any
            applicable laws. Don't misuse our Player. For example, don't
            interfere with our Player or try to access them using a method other
            than the interface and the instructions that we provide.
          </p>
          <p>
            You may discontinue your use of any Player at any time by removing
            the relevant code from your Properties.
          </p>
          <p>4. Changes to our Player; Changes to the Terms</p>
          <p>
            We are constantly changing and improving our Player. We may add or
            remove functionalities or features of the Player at any time, and we
            may suspend or stop a Player altogether.
          </p>
          <p>
            We may modify the Terms at any time. We'll post any modifications to
            the Terms on this page and any modifications to the Policies.
            Changes will generally become effective 14 days after they are
            posted. However, changes addressing new functions for a Player or
            changes made for legal reasons will be effective immediately. If you
            don't agree to any modified terms in the Terms, you'll have to stop
            using the affected Player.
          </p>
          <p>5. Intellectual Property; Brand Features</p>
          <p>
            Other than as set out expressly in the Terms, neither party will
            acquire any right, title or interest in any intellectual property
            rights belonging to the other party or to the other party's
            licensors.
          </p>
          <p>
            If we provides you the Player, we don’t grant you any sublicense or
            license for use of such software.
          </p>
          <p>
            This is purpose of enabling you to use and enjoy the benefit of the
            Player as provided by us, in the manner permitted by the Terms.
          </p>
          <p>
            You may not copy, modify, sell, or lease any part of our Player or
            included software, or reverse engineer or attempt to extract the
            source code of that software, unless laws prohibit those
            restrictions or you have our written permission.
          </p>
          <p>
            You will not remove, obscure, or alter our copyright notice, Brand
            Features, or other proprietary rights notices affixed to or
            contained within any our Services, software, or documentation.
          </p>
          <p>
            We grant you a non-exclusive, non-sublicensable license to use our
            trade names, trademarks, service marks, logos, domain names, and
            other distinctive brand features ("Brand Features") solely in
            connection with your use of Player and in accordance with this
            Terms. We may revoke this license at any time. Any goodwill arising
            from your use of our Brand Features will belong to us.
          </p>
          <p>
            We may include your name and Brand Features in our presentations,
            marketing materials, customer lists and financial reports.
          </p>
          <p>6. Privacy</p>
          <p>
            Our Privacy policy explains how we treat your personal data and
            protect your privacy when you use our Player. By using our Player,
            you agree that we can use such data in accordance with our privacy
            policy.
          </p>
        </>
      )}
    </section>
  )
}

export default PanelText

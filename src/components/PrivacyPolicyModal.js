import React from 'react'

import { Modal, ModalHeader, ModalBody } from 'reactstrap'

const PrivacyPolicyModal = props =>
    <Modal
        isOpen={props.show}
        toggle={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <ModalHeader toggle={props.onHide}>
            Terms and Conditions
        </ModalHeader>
        <ModalBody style={{'maxHeight': 'calc(100vh - 210px)', 'overflowY': 'auto'}}>
            <p>Thank you for choosing to be part of our community at SkillsLounge (&ldquo;company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at __________.</p>
            <p>When you visit our website skillslounge.io, and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy notice, we describe our privacy policy. We seek to explain to you in the clearest way possible what information we collect, how we use it and what rights you have in relation to it. We hope you take some time to read through it carefully, as it is important. If there are any terms in this privacy policy that you do not agree with, please discontinue use of our Sites and our services.</p>
            <p>This privacy policy applies to all information collected through our website (such as skillslounge.io), and/or any related services, sales, marketing or events (we refer to them collectively in this privacy policy as the <strong>&quot;Sites&quot;</strong>).</p>
            <p><strong>Please read this privacy policy carefully as it will help you make informed decisions about sharing your personal information with us.</strong></p>
            <p><br/></p>
            <p><strong>1. WHAT INFORMATION DO WE COLLECT?</strong></p>
            <p><strong>Personal information you disclose to us</strong></p>
            <p><strong>In Short:</strong> We collect personal information that you provide to us such as name, address, contact information, passwords and security data, payment information, and social media login data.</p>
            <p>We collect personal information that you voluntarily provide to us when registering at the Sites expressing an interest in obtaining information about us or our products and services, when participating in activities on the Sites or otherwise contacting us.</p>
            <p>The personal information that we collect depends on the context of your interactions with us and the Sites, the choices you make and the products and features you use. The personal information we collect can include the following:</p>
            <p><strong>Name and Contact Data.</strong> We collect your first and last name, email address, postal address, phone number, and other similar contact data.</p>
            <p><strong>Credentials.</strong> We collect passwords, password hints, and similar security information used for authentication and account access.</p>
            <p><strong>Payment Data.</strong> We collect data necessary to process your payment if you make purchases, such as your payment instrument number (such as a credit card number), and the security code associated with your payment instrument. All payment data is stored by our payment processor and you should review its privacy policies and contact the payment processor directly to respond to your questions.</p>
            <p><strong>Social Media Login Data.</strong> We provide you with the option to register using social media account details, like your Facebook, Twitter or other social media account. If you choose to register in this way, we will collect the Information described in the section called &quot;HOW DO WE HANDLE YOUR SOCIAL LOGINS&quot; below.</p>
            <p>All personal information that you provide to us must be true, complete and accurate, and you must notify us of any changes to such personal information.</p>
            <p><br/></p>
            <p><strong>Information collected from other sources</strong></p>
            <p><strong>In Short:</strong> We may collect limited data from public databases, marketing partners, social media platforms, and other outside sources.</p>
            <p>We may obtain information about you from other sources, such as public databases, joint marketing partners, social media platforms (such as Facebook), as well as from other third parties. Examples of the information we receive from other sources include: social media profile information (your name, gender, birthday, email, current city, state and country, user identification numbers for your contacts, profile picture URL and any other information that you choose to make public); marketing leads and search results and links, including paid listings (such as sponsored links).</p>
            <p><br/></p>
            <p><strong>2. HOW DO WE USE YOUR INFORMATION?</strong></p>
            <p><strong>In Short:</strong> We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent.</p>
            <p>We use personal information collected via our Sites for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests (&quot;Business Purposes&quot;), in order to enter into or perform a contract with you (&quot;Contractual&quot;), with your consent (&quot;Consent&quot;), and/or for compliance with our legal obligations (&quot;Legal Reasons&quot;). We indicate the specific processing grounds we rely on next to each purpose listed below.</p>
            <p>We use the information we collect or receive:</p>
            <ul>
                <li><strong>To facilitate account creation and logon process.</strong> If you choose to link your account with us to a third party account *(such as your Google or Facebook account), we use the information you allowed us to collect from those third parties to facilitate account creation and logon process. See the section below headed &quot;HOW DO WE HANDLE YOUR SOCIAL LOGINS&quot; for further information.</li>
                <li><strong>To protect our Sites.</strong> We may use your information as part of our efforts to keep our Sites safe and secure (for example, for fraud monitoring and prevention).</li>
            </ul>
            <p><br/></p>
            <p><strong>3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?</strong></p>
            <p><strong>In Short:</strong> We only share information with your consent, to comply with laws, to protect your rights, or to fulfill business obligations.</p>
            <p>We may process or share data based on the following legal basis:</p>
            <ul>
                <li><strong>Consent:</strong> We may process your data if you have given us specific consent to use your personal information in a specific purpose.</li>
                <li><strong>Legitimate Interests:</strong> We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
                <li><strong>Performance of a Contract:</strong> Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
                <li><strong>Legal Obligations:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).</li>
                <li><strong>Vital Interests:</strong> We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.</li>
            </ul>
            <p>More specifically, we may need to process your data or share your personal information in the following situations:</p>
            <ul>
                <li><strong>Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                <li><strong>Third-Party Advertisers.</strong> We may use third-party advertising companies to serve ads when you visit the Sites. These companies may use information about your visits to our Website(s) and other websites that are contained in web cookies and other tracking technologies in order to provide advertisements about goods and services of interest to you.</li>
            </ul>
            <p><strong>4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</strong></p>
            <p><strong>In Short:</strong> We may use cookies and other tracking technologies to collect and store your information.</p>
            <p>We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Policy.</p>
            <p><br/></p>
            <p><strong>5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</strong></p>
            <p><strong>In Short:</strong> If you choose to register or log in to our websites using a social media account, we may have access to certain information about you.</p>
            <p>Our Sites offer you the ability to register and login using your third party social media account details (like your Facebook or Twitter logins). Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile Information we receive may vary depending on the social media provider concerned, but will often include your name, e-mail address, friends list, profile picture as well as other information you choose to make public.</p>
            <p>We will use the information we receive only for the purposes that are described in this privacy policy or that are otherwise made clear to you on the Sites. Please note that we do not control, and are not responsible for, other uses of your personal information by your third party social media provider. We recommend that you review their privacy policy to understand how they collect, use and share your personal information, and how you can set your privacy preferences on their sites and apps.</p>
            <p><br/></p>
            <p><strong>6. HOW LONG DO WE KEEP YOUR INFORMATION?</strong></p>
            <p><strong>In Short:</strong> We keep your information for as long as necessary to fulfill the purposes outlined in this privacy policy unless otherwise required by law.</p>
            <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements). No purpose in this policy will require us keeping your personal information for longer than the period of time in which users have an account with us.</p>
            <p>When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize it, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.</p>
            <p><br/></p>
            <p><strong>7. HOW DO WE KEEP YOUR INFORMATION SAFE?</strong></p>
            <p><strong>In Short:</strong> We aim to protect your personal information through a system of organisational and technical security measures.</p>
            <p>We have implemented appropriate technical and organisational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our Sites is at your own risk. You should only access the services within a secure environment.</p>
            <p><br/></p>
            <p><strong>8. DO WE COLLECT INFORMATION FROM MINORS?</strong></p>
            <p><strong>In Short:</strong> We do not knowingly collect data from or market to children under 18 years of age.</p>
            <p>We do not knowingly solicit data from or market to children under 18 years of age. By using the Sites, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent&rsquo;s use of the Sites. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we have collected from children under age 18, please contact us at billy.michael@ecs-digital.co.uk.</p>
            <p><br/></p>
            <p><strong>9. WHAT ARE YOUR PRIVACY RIGHTS?</strong></p>
            <p><strong>In Short:</strong> In some regions, such as the European Economic Area, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.</p>
            <p>In some regions (like the European Economic Area), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the right to object to the processing of your personal information. To make such a request, please use the contact details provided below. We will consider and act upon any request in accordance with applicable data protection laws.</p>
            <p>If we are relying on your consent to process your personal information, you have the right to withdraw your consent at any time. Please note however that this will not affect the lawfulness of the processing before its withdrawal.</p>
            <p>If you are resident in the European Economic Area and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority. You can find their contact details here: http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm</p>
            <p><strong>Account Information</strong></p>
            <p>If you would at any time like to review or change the information in your account or terminate your account, you can:</p>
            <ul>
                <li>Log into your account settings and update your user account.</li>
                <li>Contact us using the contact information provided.</li>
            </ul>
            <p>Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, some information may be retained in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use and/or comply with legal requirements.</p>
            <p><strong><u>Cookies and similar technologies:</u></strong> Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Sites. To opt-out of interest-based advertising by advertisers on our Sites visit http://www.aboutads.info/choices/.</p>
            <p><strong><u>Opting out of email marketing:</u></strong> You can unsubscribe from our marketing email list at any time by clicking on the unsubscribe link in the emails that we send or by contacting us using the details provided below. You will then be removed from the marketing email list &ndash; however, we will still need to send you service-related emails that are necessary for the administration and use of your account. To otherwise opt-out, you may:</p>
            <ul>
                <li>Contact us using the contact information provided.</li>
            </ul>
            <p><br/></p>
            <p><strong>10. CONTROLS FOR DO-NOT-TRACK FEATURES</strong></p>
            <p>Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track (&ldquo;DNT&rdquo;) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. No uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Policy.</p>
            <p><br/></p>
            <p><strong>11. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</strong></p>
            <p><strong>In Short:</strong> Yes, if you are a resident of California, you are granted specific rights regarding access to your personal information.</p>
            <p>California Civil Code Section 1798.83, also known as the &ldquo;Shine The Light&rdquo; law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below.</p>
            <p>If you are under 18 years of age, reside in California, and have a registered account with the Sites, you have the right to request removal of unwanted data that you publicly post on the Sites. To request removal of such data, please contact us using the contact information provided below, and include the email address associated with your account and a statement that you reside in California. We will make sure the data is not publicly displayed on the Sites, but please be aware that the data may not be completely or comprehensively removed from our systems.</p>
            <p><br/></p>
            <p><strong>12. DO WE MAKE UPDATES TO THIS POLICY?</strong></p>
            <p><strong>In Short:</strong> Yes, we will update this policy as necessary to stay compliant with relevant laws.</p>
            <p>We may update this privacy policy from time to time. The updated version will be indicated by an updated &ldquo;Revised&rdquo; date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy policy, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.</p>
            <p><br/></p>
            <p><strong>13. HOW CAN YOU CONTACT US ABOUT THIS POLICY?</strong></p>
            <p>If you have questions or comments about this policy, you may email us at billy.michael@ecs-digital.co.uk or by post to:</p>
            <p>SkillsLounge<br/>2 More London Riverside, <br/>SE1 2JP<br/>United Kingdom</p>
            <p><br/></p>
            <p><strong>HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</strong></p>
            <p>Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, change that information, or delete it in some circumstances. To request to review, update, or delete your personal information, please submit a request form by clicking here. We will respond to your request within 30 days.</p>
            </ModalBody>
    </Modal>

export default PrivacyPolicyModal
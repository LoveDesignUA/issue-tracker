import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const alice = await prisma.issue.createMany({
    data: [
      {
        title: "Update website navigation",
        description:
          "Revise website navigation to improve user experience and make it easier for users to find information. Ensure that navigation menus are intuitive and well-organized.",
        status: "OPEN",
        createdAt: "2024-03-06T18:20:00Z",
        updatedAt: "2024-04-11T21:50:00Z",
      },
      {
        title: "Fix broken product filters",
        description:
          "Product filters are not working correctly, causing users to have difficulty narrowing down search results. Investigate and fix the issue to improve product search functionality.",
        status: "IN_PROGRESS",
        createdAt: "2024-03-05T10:45:00Z",
        updatedAt: "2024-04-11T22:50:00Z",
      },
      {
        title: "Optimize server-side rendering",
        description:
          "Implement server-side rendering optimizations to improve page load times and overall performance. This will enhance user experience, especially for users on slower internet connections.",
        status: "OPEN",
        createdAt: "2024-03-04T13:30:00Z",
        updatedAt: "2024-04-11T23:50:00Z",
      },
      {
        title: "Resolve broken checkout process",
        description:
          "Users are experiencing errors during the checkout process, preventing them from completing their purchases. Fix the checkout process to minimize cart abandonment and increase conversion rates.",
        status: "IN_PROGRESS",
        createdAt: "2024-03-03T16:55:00Z",
        updatedAt: "2024-04-12T00:50:00Z",
      },
      {
        title: "Update FAQ section",
        description:
          "Review and update the FAQ section to address common user inquiries and provide helpful information. Ensure that FAQs are up-to-date and cover relevant topics.",
        status: "OPEN",
        createdAt: "2024-03-02T19:40:00Z",
        updatedAt: "2024-04-12T01:50:00Z",
      },
      {
        title: "Implement user feedback feature",
        description:
          "Add a user feedback feature to gather feedback from customers and improve the website based on their suggestions. Implement feedback forms and mechanisms for users to submit their input.",
        status: "IN_PROGRESS",
        createdAt: "2024-03-01T11:15:00Z",
        updatedAt: "2024-04-12T02:50:00Z",
      },
      {
        title: "Fix responsive design issues",
        description:
          "Some pages on the website are not displaying correctly on mobile devices, leading to a poor user experience. Fix responsive design issues to ensure that the website is mobile-friendly.",
        status: "OPEN",
        createdAt: "2024-02-29T14:30:00Z",
        updatedAt: "2024-04-12T03:50:00Z",
      },
      {
        title: "Update terms of use",
        description:
          "Review and update the terms of use to reflect changes in regulations and business practices. Ensure that the terms are legally compliant and clearly communicated to users.",
        status: "IN_PROGRESS",
        createdAt: "2024-02-28T17:45:00Z",
        updatedAt: "2024-04-12T04:50:00Z",
      },
      {
        title: "Resolve broken contact form",
        description:
          "The contact form on the website is not functioning properly, preventing users from submitting inquiries. Fix the contact form to ensure that users can reach out for support.",
        status: "OPEN",
        createdAt: "2024-02-27T10:10:00Z",
        updatedAt: "2024-04-12T05:50:00Z",
      },
      {
        title: "Improve search engine optimization",
        description:
          "Optimize website content and structure for better search engine visibility. Implement SEO best practices to improve rankings and drive organic traffic to the website.",
        status: "IN_PROGRESS",
        createdAt: "2024-02-26T13:25:00Z",
        updatedAt: "2024-04-12T06:50:00Z",
      },
      {
        title: "Fix broken product reviews",
        description:
          "Product reviews are not displaying correctly on product pages, preventing users from viewing or leaving reviews. Resolve the issue to restore functionality and enhance user engagement.",
        status: "OPEN",
        createdAt: "2024-02-25T16:40:00Z",
        updatedAt: "2024-04-12T07:50:00Z",
      },
      {
        title: "Update website footer",
        description:
          "Revise website footer to include important links, contact information, and legal notices. Ensure that the footer is well-designed and provides easy access to essential resources.",
        status: "IN_PROGRESS",
        createdAt: "2024-02-24T19:55:00Z",
        updatedAt: "2024-04-12T08:50:00Z",
      },
      {
        title: "Resolve broken image links",
        description:
          "Some images on the website are not loading due to broken links. Update image URLs to ensure that all images are displayed correctly and enhance visual appeal.",
        status: "OPEN",
        createdAt: "2024-02-23T12:20:00Z",
        updatedAt: "2024-04-12T09:50:00Z",
      },
      {
        title: "Implement social media integration",
        description:
          "Integrate social media sharing buttons and links to improve website visibility and encourage user engagement. Allow users to easily share content on popular social media platforms.",
        status: "IN_PROGRESS",
        createdAt: "2024-02-22T15:35:00Z",
        updatedAt: "2024-04-12T10:50:00Z",
      },
      {
        title: "Fix broken user registration",
        description:
          "Users are unable to register new accounts due to errors in the registration process. Fix user registration functionality to allow new users to sign up and access website features.",
        status: "OPEN",
        createdAt: "2024-02-21T18:50:00Z",
        updatedAt: "2024-04-12T11:50:00Z",
      },
      {
        title: "Update website layout",
        description:
          "Revamp website layout to improve visual appeal and usability. Implement a modern design that enhances user experience and reflects the brand's identity.",
        status: "IN_PROGRESS",
        createdAt: "2024-02-20T11:15:00Z",
        updatedAt: "2024-04-12T12:50:00Z",
      },
      {
        title: "Resolve broken search functionality",
        description:
          "The search functionality on the website is returning inaccurate results. Users are having difficulty finding the desired products. Investigate and fix the issue to improve user experience.",
        status: "OPEN",
        createdAt: "2024-02-19T14:30:00Z",
        updatedAt: "2024-04-12T13:50:00Z",
      },
      {
        title: "Update product pricing",
        description:
          "Review and update product prices to remain competitive in the market. Adjust prices based on market trends, competitor pricing, and cost considerations.",
        status: "IN_PROGRESS",
        createdAt: "2024-02-18T17:45:00Z",
        updatedAt: "2024-04-12T14:50:00Z",
      },
      {
        title: "Resolve broken checkout process",
        description:
          "Users are experiencing errors during the checkout process, preventing them from completing their purchases. Fix the checkout process to minimize cart abandonment and increase conversion rates.",
        status: "OPEN",
        createdAt: "2024-02-17T10:10:00Z",
        updatedAt: "2024-04-12T15:50:00Z",
      },
      {
        title: "Implement new payment gateway",
        description:
          "Integrate a new payment gateway to provide customers with more payment options and improve the checkout experience. The new payment gateway should support multiple currencies and offer secure transactions.",
        status: "IN_PROGRESS",
        createdAt: "2024-02-16T13:25:00Z",
        updatedAt: "2024-04-12T16:50:00Z",
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

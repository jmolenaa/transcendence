controllers/ — The Request Handler
This is where you:
Extract req.body, req.params, etc.
Call services
Send a response using reply.send()
Handle errors
💡 If the logic needs to interact with the business layer or format a response → this is where it happens



"Is this the logic that runs when the route is hit?"
→ Yes? ➤ controllers/

"Is this logic deeply related to how my app works?"
→ That probably belongs to a service/, and your controller calls it
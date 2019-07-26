# XMPL-Poll-and-Wait
Sample code to display a personalized page (with XMPie XMPL) and then wait for an ADOR to be updated

This code uses XMPie's platform to display a personalized page.
The page initiates an external touchpoint upon loading but then sits and wait for the recipient's ADORs to be updated via that external process. We do not know how long it will take, so we sit and poll the XMPL controller until we see something changes.

By all means use this code as an example. 

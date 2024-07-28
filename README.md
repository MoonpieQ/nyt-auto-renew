Help me write a node js script that does the following: 
0. it should take 2 parameters: user_name and pwd,
1. Go to URL "https://www.nytimes.com/"
2. click on a tag that contains word "Log In"
3. after page load, type in user_name in `<input id="email" name="email" type="email" placeholder="" maxlength="64" autocapitalize="off" autocomplete="username" tabindex="0" aria-hidden="false" class="css-11g480x-InputBox e1e6zg665" value="">`
4. click `<button type="submit" tabindex="0" data-testid="submit-email" class="css-1i3jzoq-buttonBox-buttonBox-primaryButton-primaryButton-Button">Continue</button>`
5. type in pwd in `<input id="password" name="password" type="password" placeholder="" maxlength="255" autocapitalize="off" autocomplete="off" tabindex="0" aria-hidden="false" class="css-e478v4-InputBox e1e6zg665" value="">`
6. Click `<button type="submit" tabindex="0" data-testid="login-button" class="css-1i3jzoq-buttonBox-buttonBox-primaryButton-primaryButton-Button">Log In</button>`
7. Start a new tab, go to "https://www.nytimes.com/subscription/redeem?campaignId=8WH8J&gift_code=gift_code" 
8. after page load, click button <button data-testid="btn-redeem" type="submit" class="css-1qbmblg">Redeem</button>

After this create a docker file that contains node env and run the script at docker container start up. then shut it down when it's compeleted.
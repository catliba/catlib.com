---
title: "Selenium"
tags: ["python"]
date: "10/30/25"
category: "Selenium"
---

Automation saves time and energy so that you can be doing other things. Websites can be automated with the help of selenium, and in this tutorial, I will be going over the basics of selenium and show an real life use of it - automating menial tasks from my work.

### Setup
You need pip installed on your cli. Then, you install selenium via `pip install selenium.` We are using Chrome so install [chromedriver](https://developer.chrome.com/docs/chromedriver/downloads) corresponding to the appropriate Chrome version and then put that file in a specific PATH.

### Getting started
Below is a basic selenium prompt that does essentially nothing. It just runs the code and opens the webpage with a driver.
 ```
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
import time

PATH = "chromedriver.exe"
service = Service(PATH)
driver = webdriver.Chrome(service=service)

driver.get("<website link>")
print(driver.title)

time.sleep(10)

driver.quit()
 ```

### Locating Elements from HTML
In a website, there are buttons, text fields, text, etc. These things are known as elements and with selenium, we can interact with these elements. How do we identify these elements though? Right click inspect element gives you attributes such as id, class, etc. These are called locators and we want to select the attribute that is the most unique.

In our IDE, we do `driver.find_element(By.)` and we can select different attributes (ID, XPATH, etc).

Elements:
- checkboxes
- links
- text fields

Locators:
- ID
- Name
- Class Name
- CSS Selector
- XPATH
- Link Text

Interaction:
- Text field - for typing
- Checkbox - for x or un-x
- Link - for navigating the link

Assertions:
- Verify the functionality
- Verify that there should be a button with a text "Login"

##### Example
Let us say that the `name` of a tag is `"s"`.
`search = driver.find_element_by_name("s")` returns to us the object that in this case is a search bar.
`search.send_keys("test")` types test in the search bar
`search.send_keys(Keys.RETURN)` presses Enter (return) key

Now, we're on a different page within the site. What else can we do?
`main = driver.find_element_by_id("main")` selects the id tag labeled main, which is the entire page here.

Note that when you are on a webpage and search something, the results are not instantaneous. So, to make sure selenium accounts for the delay, we need this:

```
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

try:
    main = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "main"))
    )
# note finally, not except
finally:
    driver.quit()
```

What if we want specifically just the headers?
Inside the main tag is an article tag that contains a h1 tag of titles with className = entry-title.
```
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

try:
    main = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "main"))
    )
    articles = main.find_elements_by_tag_name("article")
    for article in articles:
	    header = article.find_element_by_class_name("entry-title")
# note finally, not except
finally:
    driver.quit()
```

##### Selectorshub
- A cool browser extension that seamlessly gives you a specific unique locator. Can use it by inspecting element.
### Page navigating and clicking elements
How to navigate through a website? Usually, what you're looking for requires you to click and navigate through the website. Like before, we inspect element the button that routes us to where we are headed. 
`link = driver.find_element_by_link_text("<actual text of button>")`
`link.click()`
This goes to whatever button you just clicked.
When we go to a new page, remember that we need to wait for the element to load in.
To do that, we implement a try finally statement:
```
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
...

link = driver.find_element_by_link_text("Python Programming")
link.click() 
# Gotta wait for it to load before clicking into another button
try:
    element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.LINK_TEXT, "Beginner Python Tutorials"))
    )
    element.click()
    element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "<id tag for button>"))
    )
    element.click()
    
    driver.back() # goes back a page
    driver.back()
    driver.back()
    driver.forward() # goes forward
finally:
    driver.quit()
```
### ActionChains and Automating Cookie Clicker
There's this game called Cookie Clicker which essentially you just click cookies to get cookies and upgrade your click power so you get more cookies. We will use selenium to automatically click and upgrade for us.
```
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains

PATH = "\chromedriver.exe"
service = Service(PATH)
driver = webdriver.Chrome(service=service)
driver.get("https://<cookie clicker website>")


```
`actions.perform()` is kind of like the return statement, executing the actions

We first inspect the buttons we are trying to click as well as other information on the page we need.
Inspect cookie with id of bigCookie
Inspect number of cookies with id cookies
```
driver.implicitly_wait(5) # wait 5 sec first for everything to load
cookie = driver.find_element_by_id("bigCookie")
cookie_count = driver.find_element_by_if("cookies")
```
Now find the upgrade section. How much does it cost?
```
items = [driver.find_element_by_id("productPrice" + str(i)) for i in (1,-1,-1)]
```
This essentially makes it so that we choose a certain upgrade for our clicker. Starting from a bigger value (only have tag id productPrice(0/1) at the moment)

```
actions = ActionChains(driver)
actions.click(cookie)

for i in range(5000):
	actions.perform()
	for item in items::
		value = int(item.text)
		if value <= count:
			upgrade_actions = ActionChains(driver)
			upgrade_actions.move_to_element(item) # move the cursor to that location  
			upgrade_actions.click() # press cursor down
			upgrade_actions.perform()
```

### Automating my work
Now, I will use selenium to automate my work. To start, I create a fresh virtual environment to setup my work. 
- `python -m venv .venv` creates the virtual environment in the directory of my choice.
- `. .venv\Scripts\Activate` starts it up (should see (.venv) at the prompt)
- `python -m pip install --upgrade pip` 
- `pip install selenium` install necessary dependencies

Now, we setup the selenium code. From the tutorial, I copy and paste the following
```
from selenium import webdriver
  
driver = webdriver.Chrome()
driver.get("http://selenium.dev")
driver.maximize_window()

input("Press Enter to close...")
driver.quit()
```

I will be automating https://saga.org/products/saga-connect/ which is my Math Tutoring website. Every day, I need to create a session add the session date, time, period, name, and individual students. It's very tedious and I want to automate this process.

##### Login Functionality
To go around 2FA, I have several options: 
1. Let Selenium start the login and pause for you to finish 2FA manually
2. Use a persistent browser profile (keep the session logged in)
3. Save cookies after a manual login and load them later
4. Use an official API, service account, or automation-friendly auth
I decided to use Option 2 since only I was using this script. 
```
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import os

# 2FA
opts = Options()
chrome_profile_path = os.path.abspath("./chrome_profile")
opts.add_argument(f"--user-data-dir={chrome_profile_path}")  

driver = webdriver.Chrome(options=opts)
driver.get("https://saga.org/products/saga-connect/")
driver.maximize_window()

wait = WebDriverWait(driver, 10)
link = wait.until(EC.element_to_be_clickable((By.LINK_TEXT, "Sign In")))
link.click()

input("Press Enter to close...")
driver.quit()
```

##### New Tab
Once I click the "Sign In" link on the website and auto log in, it takes me to a new page. However, selenium isn't on the new page but I want it to be so I need to make it switch to the new window.
```
driver.switch_to.window(driver.window_handles[1])
print(driver.window_handles)
print(driver.current_window_handle)
```

##### Clicking Buttons
On the dashboard tab, we want to go to the Sessions page and then add a session. Two button clicks.
```
sessions_tab = wait.until(EC.element_to_be_clickable((By.XPATH, "//a[contains(@class,'nav-bar-link')][contains(.,'Session')]")))
sessions_tab.click()

add_sesh = wait.until(EC.element_to_be_clickable((By.XPATH, "//span[normalize-space()='Add New Session']")))
add_sesh.click()
```
Note: I had a hard time getting the XPATH to work as the error kept on telling me no session exists.
Now, I need to customize my session. Specifically, add students, add session title, select the appropriate session date, period, and start and end time (see how tedious this is?)
##### Handling Date, Period, Content, etc.
Now, we have opened the Sessions modal and we have to fill in everything. It's a lot, but its repetitive work for the most part so I'll briefly go over how I did it.

First, I select the appropriate date, which would be the next day on the calendar assuming I run this script before 12:00 AM. So I import Python's built in datetime and get to work:

```
current_date = datetime.now()
next_date = current_date + timedelta(days=1)
formatted_date = next_date.strftime("%Y-%m-%d")

# Selenium part
adjust_date = wait.until(EC.element_to_be_clickable((
	By.XPATH,"//input[@name='session date-date']"
)))
adjust_date.clear()
adjust_date.send_keys(formatted_date)
```
Next, we type in the appropriate title for the class:
```
title = wait.until(EC.element_to_be_clickable((By.XPATH, "//input[@type='text']")))
title.send_keys("p1")
```
Corresponding period:
```
period_dd = wait.until(EC.element_to_be_clickable((
    By.XPATH, "//div[contains(@class,'label') and contains(@class,'placeholder') and normalize-space()='Select Period']"
)))
period_dd.click()
opt = wait.until(EC.element_to_be_clickable((
    By.XPATH, "//div[@title='A1.2 - red - room 217' and contains(@class,'item-cont')]"
)))
opt.click()
```
Content:
```
content = wait.until(EC.element_to_be_clickable((By.XPATH, "//li[normalize-space()='Add Content']")))
content.click()
lesson = 74
box = wait.until(
    EC.visibility_of_element_located((By.XPATH, f"//div[@class='wgw-item-cont' and @data-idx='{lesson}']"))
)
box.click()
```
Students:
```
add_students = wait.until(EC.element_to_be_clickable((By.XPATH, "//li[@class='add-student']")))
add_students.click()
show_students = wait.until(EC.element_to_be_clickable((By.XPATH, "//input[@type='checkbox']")))
show_students.click()
container = wait.until(
    EC.presence_of_element_located((By.CSS_SELECTOR, "div.select-mode-list"))
)

def select_student(name_text, timeout=20):
    end = time.time() + timeout
    while True:
        xpath = f".//div[@class='student-name' and normalize-space(.)={repr(name_text)}]/ancestor::div[contains(@class,'student-block')]"
        elems = container.find_elements(By.XPATH, xpath)
        if elems:
            target = elems[0]
            driver.execute_script(
                "arguments[0].scrollIntoView({block:'center'});", target
            )
            try:
                wait.until(EC.element_to_be_clickable(target)).click()
            except Exception:
                driver.execute_script("arguments[0].click();", target)
            break
        driver.execute_script("arguments[0].scrollTop = arguments[0].scrollTop + 600;", container)
        time.sleep(0.2)
        if time.time() > end:
            raise TimeoutException(f"Student '{name_text}' not found in list")
```
This one was probably the trickiest part, just because selecting the students required me to scroll into view in order to locate the student placard.
Time:
```
start_time = wait.until(EC.presence_of_element_located(
    (By.XPATH, "//input[@name='start time-date']")
))
driver.execute_script("arguments[0].scrollIntoView(true);", start_time)
start_time.clear()
start_time.send_keys("05:50 AM")
  
end_input = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.XPATH, "//input[@name='end time-date']"))
)
end_input.clear()
end_input.send_keys("6:30 AM")
```
Done (yea its a lot):
```
save = wait.until(EC.presence_of_element_located(
    (By.XPATH, "//button[@class='save-event-btn']")
))
try:
    save.click()
    time.sleep(1.0)
except Exception:
    driver.execute_script("arguments[0].click();", save)
```

Great! Now I finished one period. So I copy paste this three more times and then I'm done. Also, there are A and B days so I made two copies of the same script; one for A day, one for B day. Might push code onto GitHub.

##### Conclusion
Selenium is a powerful tool that allows me to have greater control over webpages. With websites being such an integral part of my everyday life, I know for a fact that this knowledge will come into handy later on. My next steps with Selenium is learning how to use it on more dynamic websites. Thanks for reading, hope this was somewhat helpful.
from RPA.Browser.Selenium import Selenium
import time
import pandas as pd
from bs4 import BeautifulSoup
import json

lib = Selenium()


# Function: Open and navigate to SCOPE
def navigate_to_browser(ubc_user, ubc_pw):
    # OPEN BROWSER
    lib.open_available_browser("https://scope.sciencecoop.ubc.ca/students/cwl-current-student-login.htm")
    lib.set_browser_implicit_wait(10)
    # SCOPE LOGIN
    login_button = lib.click_link("xpath:/html/body/div/main/div/div/a")
    lib.wait_until_element_is_visible('xpath:/html/body/div[1]/div/div/div/div/h1')
    # CWL LOGIN
    username_input_field = "xpath://*[@id='username']"
    password_input_field = "xpath://*[@id='password']"
    pause(0.1)
    lib.input_text_when_element_is_visible(username_input_field, ubc_user)
    pause(0.1)
    lib.input_text_when_element_is_visible(password_input_field, ubc_pw)
    lib.click_button('xpath://*[@id="col2"]/form/div[3]/button')
    # SCOPE HOMEPAGE
    pause(0.5)
    lib.click_button_when_visible('xpath:/html/body/div[2]/header/div[4]/div/div/button')
    pause(1)
    lib.click_button_when_visible('xpath:/html/body/div[2]/header/div[3]/div[1]/nav/ul/li[2]/button')
    pause(1)
    lib.click_element_when_visible('xpath://*[@id="myAccountNav"]/nav/ul/li[2]/ul/li[2]/a')
    pause(3)
    lib.click_element_when_visible('xpath://*[@id="quickSearchCountsContainer"]/table[2]/tbody/tr[1]/td[2]/a')
    pause(1)


# Function: Pause
def pause(secs):
    time.sleep(secs)
    

# Main function
def main(ubc_user, ubc_pw):
    try:
        # navigate
        navigate_to_browser(ubc_user=ubc_user, ubc_pw=ubc_pw)
        # get data
        soup = BeautifulSoup(lib.driver.page_source, "html.parser")
        table = pd.read_html(lib.driver.page_source)[0]
        # modify data
        lib.close_all_browsers()
        table.insert(1, "Job Type", "")
        
        
        print("Writing JSON...")
        # Write JSON to array
        jsonParentObject = {}
        for i in range(len(table)):
            # write json object
            job_data = {
                'job_title': table['Job Title'].iloc[i],
                'organization' : table['Organization'].iloc[i],
                'location': table['Location'].iloc[i],
                'app_deadline': table['App Deadline'].iloc[i]
            }
            jsonParentObject[job_data['job_title'] + '-' + job_data['organization']] = job_data

        # Write to JSON file
        fileOutputData = json.dumps(jsonParentObject, indent=4)
        with open('generated_data.json', 'w') as outfile: 
            outfile.write(fileOutputData)

    except Exception as e:
        print(e)


# Main Method
if __name__ == "__main__":
    userfile = open('input/user.txt')
    username = userfile.readline()
    pw = userfile.readline()
    main(username, pw)

from RPA.Browser.Selenium import Selenium
import time
import pandas as pd
from bs4 import BeautifulSoup
import json

lib = Selenium()

# Global vars
fullStackJson = {}
frontendJson = {}
backendJson = {}



# Function: Open and navigate to SCOPE
def navigate_to_browser(ubc_user, ubc_pw) -> None:
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
def pause(secs) -> None:
    time.sleep(secs)

def writeDataToDict(index) -> None:
    # write json object
    job_data = {
        'job_title': table['Job Title'].iloc[index],
        'organization' : table['Organization'].iloc[index],
        'location': table['Location'].iloc[index],
        'app_deadline': table['App Deadline'].iloc[index]
    }
    
    # Frontend?
    for word in ['web', 'front', 'app', 'ui', 'ux']:
        if word in job_data['job_title'].lower():
            print("FRONTEND" , job_data['job_title'])
            job_data['type'] = 'front-end'
            frontendJson[job_data['job_title'] + '-' + job_data['organization']] = job_data
            return
    
    # Backend?
    for word in ['data', 'science', 'back', 'machine', 'ops', 'firmware', 'embedded', 'systems']:
        if word in job_data['job_title'].lower():
            print("BACKEND: ", job_data['job_title'])
            job_data['type'] = 'back-end'
            backendJson[job_data['job_title'] + '-' + job_data['organization']] = job_data
            return
    
    # Fullstack?
    print("FULLSTACK", job_data['job_title'])
    job_data['type'] = 'full-stack'
    fullStackJson[job_data['job_title'] + '-' + job_data['organization']] = job_data
    return

    

# Main function
def main(ubc_user, ubc_pw) -> None:
    try:
        # navigate
        navigate_to_browser(ubc_user=ubc_user, ubc_pw=ubc_pw)
        # get data
        soup = BeautifulSoup(lib.driver.page_source, "html.parser")
        global table
        table = pd.read_html(lib.driver.page_source)[0]
        # modify data
        lib.close_all_browsers()
        table.insert(1, "Job Type", "")
        
        
        print("Writing JSON...")
        # Write JSON to array
        
        for index in range(len(table)):
            writeDataToDict(index)

        # Write to file
        with open('fullstack.json', 'w') as outfile: 
            outfile.write(json.dumps(fullStackJson, indent=4))
        with open('frontend.json', 'w') as outfile: 
            outfile.write(json.dumps(frontendJson, indent=4))
        with open('backend.json', 'w') as outfile: 
            outfile.write(json.dumps(backendJson, indent=4))

    except Exception as e:
        print(e)


# Main Method
if __name__ == "__main__":
    userfile = open('input/user.txt')
    username = userfile.readline()
    pw = userfile.readline()
    main(username, pw)

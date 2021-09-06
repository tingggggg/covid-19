import re
import sys
import time
import json
import sqlite3
import requests
from bs4 import BeautifulSoup
from selenium.webdriver import Chrome,ChromeOptions

import traceback
import pymysql


def get_conn():
    # 建立連接
    conn = pymysql.connect(host="127.0.0.1", user="root", password="123", db="cov", charset="utf8")
    cursor = conn.cursor()
    return conn, cursor

def close_conn(conn, cursor):
    if cursor:
        cursor.close()
    if conn:
        conn.close()

def get_history():
    option = ChromeOptions()
    option.add_argument("--headless")#不開啟瀏覽器
    option.add_argument("--no--sandbox")
    browser =  Chrome(options = option,executable_path="./chromedriver")

    url = "https://covid-19.nchc.org.tw/myDT_staff.php?TB_name=csse_covid_19_daily_reports_country&limitColumn=a01&limitValue=TW/%&equalValue=%20like%20&encodeKey=MTYyMjkyMjA5NQ==&c[]=id&t[]=int&d[]=NO&c[]=a01&t[]=varchar&d[]=NO&c[]=a02&t[]=date&d[]=NO&c[]=a03&t[]=int&d[]=NO&c[]=a04&t[]=int&d[]=NO&c[]=a05&t[]=int&d[]=NO&c[]=a06&t[]=int&d[]=NO&c[]=a07&t[]=decimal&d[]=NO&c[]=a08&t[]=decimal&d[]=NO&c[]=a09&t[]=decimal&d[]=NO&c[]=a10&t[]=decimal&d[]=NO&c[]=a11&t[]=decimal&d[]=NO"
    browser.get(url)

    datas = browser.find_element_by_xpath("//body")
    datas = json.loads(datas.text)
    # 日期 確診數 死亡數 解除隔離數 隔離人數 解封指數 七天確診平均數
    keys = {'a02': 'ds', 'a03': 'confirm', 'a04': 'dead', 'a05': 'deisolated', 'a06': 'isolated', 'a07': 'unblock', 'a09': 'averageconfirm'}
    final_datas = []
    for data in datas["data"]:
        data = {keys[k]: v for k, v in data.items() if k in keys}
        final_datas.append(data)
    return final_datas

def get_details():
    option = ChromeOptions()
    option.add_argument("--headless")#不開啟瀏覽器
    option.add_argument("--no--sandbox")
    browser =  Chrome(options = option,executable_path="./chromedriver")
    
    url_detail = "https://covid-19.nchc.org.tw/myDT_staff.php?TB_name=covidtable_taiwan_cdc4&limitColumn=id&limitValue=0&equalValue=!=&encodeKey=MTYyMzIxODUxNQ==&c[]=id&t[]=int&d[]=NO&c[]=a01&t[]=date&d[]=NO&c[]=a02&t[]=varchar&d[]=NO&c[]=a03&t[]=varchar&d[]=NO&c[]=a04&t[]=int&d[]=NO&c[]=a05&t[]=int&d[]=NO+"
    browser.get(url_detail)

    datas = browser.find_element_by_xpath("//body")
    datas = json.loads(datas.text)
    detail_datas = []
    keys = {'a01': 'update_time', 'a02': 'city', 'a04': 'confirm_add', 'a05': 'confirm'}
    for data in datas['data']: 
        if (data["a03"] == "全區" and data["a02"] != "境外移入"):
            data = {keys[k]: v for k, v in data.items() if k in keys}
            detail_datas.append(data)
    return detail_datas

def update_history():
    cursor = None
    conn = None
    try:
        
        history = get_history() # 獲取資料
        conn, cursor = get_conn()
        sql = "insert into history values (%s,%s,%s,%s,%s,%s,%s)"
        sql_query = "select confirm from history where ds=%s"
        update_cnt = 0
        for v in history:
            if not cursor.execute(sql_query, v.get("ds")):
                update_cnt += 1
                cursor.execute(sql,[v.get("ds"), v.get("confirm"),v.get("dead"),v.get("deisolated"),
                                    v.get("isolated"),v.get("unblock"),v.get("averageconfirm")])
        conn.commit()
        print(f"{time.asctime()}歷史數據更新完畢，{update_cnt} 筆數據被更新")
    except:
        traceback.print_exc()
    finally:
        close_conn(conn,cursor)
    
def update_detail():
    cursor = None
    conn = None
    try:
        print(f"{time.asctime()}開始爬取'縣市'數據")
        details = get_details()
        first_data_time = details[0].get("update_time")

        conn,cursor = get_conn()
        sql = "insert into details(update_time,city,confirm,confirm_add) values(%s,%s,%s,%s)"
        sql_query = 'select confirm from details where city=%s and update_time=%s'
        cnt = 0
        for v in details:
            if not cursor.execute(sql_query, [v.get("city"), v.get("update_time")]):
                cnt += 1
                cursor.execute(sql, [v.get("update_time"), v.get("city"),v.get("confirm"),v.get("confirm_add")])
        conn.commit()
        print(f"{time.asctime()} 數據更新完畢，{cnt} 筆數據被更新")
    except:
        traceback.print_exc()
    finally:
        close_conn(conn, cursor)


if __name__ == "__main__":

    if (len(sys.argv) <= 1):
        print('''
                usage: python crawler.py up_de
                        
                       python crawler.py up_his
              ''')
        sys.exit(0)

    optin = sys.argv[1]

    if optin == "up_de":
        update_detail()
    elif optin == "up_his":
        update_history()
    else:
        print(f"No such {optin} optin")
import time
import pymysql

def get_time():
    time_str = time.strftime("%Y{}%m{}%d{} %X")
    return time_str.format("年","月","日")

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

def query(sql,*args):
    """

    :param sql:
    :param args:
    :return:
    """
    conn,cursor = get_conn()
    cursor.execute(sql,args)
    res = cursor.fetchall()
    close_conn(conn,cursor)
    return res

def get_c1_data():
    sql = "select `confirm`,`isolated`,`dead`,`unblock` from history order by ds desc limit 1"
    res = query(sql)
    return res[0]

def get_c2_data():
    sql = "select `ds`,`confirm`,`isolated`,`dead`,`unblock` from history order by ds desc limit 10"
    res = query(sql)
    return res

def get_map_data():
    sql_city = "select city from details group by city"
    sql_results = "select * from details where city=%s order by update_time desc limit 1"
    cities = query(sql_city) # 先找出所有縣市
    results = []
    for city in cities:
        res = query(sql_results, city)
        results.append(res[0])
    return results

def get_c3_data():
    sql_city = "select city from details group by city"
    cities = query(sql_city)
    sql_results = "select confirm_add from details where city=%s order by update_time desc limit 7"
    results = {}
    for city in cities:
        city = city[0]
        res = query(sql_results, city)
        res = [x[0] for x in res]
        results[city] = res
    return results


if __name__ == "__main__":
    print(get_c3_data())
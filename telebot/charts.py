import matplotlib.pyplot as plt
from matplotlib.dates import DateFormatter
import io

def chart_buffer(X: list, Y: list, info: dict):
    fig, ax = plt.subplots()
    ax.set_xlabel('Time')
    ax.set_ylabel('Price, USD')
    myFmt = DateFormatter("%D %H:%M:%S")
    ax.xaxis.set_major_formatter(myFmt)
    ax.plot(X, Y)
    if 'title' in info:
        plt.title(info['title'])
    fig.autofmt_xdate()
    plt.grid()
    buf = io.BytesIO()
    buf.name = "chart.png"
    fig.savefig(buf, format='png')
    buf.seek(0)
    return buf

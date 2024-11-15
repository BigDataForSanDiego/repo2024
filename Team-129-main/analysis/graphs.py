import pandas as pd
import numpy
import matplotlib.pyplot as plt

def plot_pharm_med(rec_df, pharm, med):
    x = rec_df.loc[pharm].Time
    y = rec_df.loc[pharm].Stock.apply(lambda x: x[med]).values
    plt.plot(x,y)

def plot_pharm_all(rec_df, pharm):
    x = rec_df.loc[pharm].Time
    y = rec_df.loc[pharm].Stock.values.sum()
    plt.plot(x,y)

def plot_all(rec_df, pharm):
    x = rec_df.loc[pharm].Time
    y = rec_df.loc[pharm].Stock.values.sum()
    plt.plot(x,y)

plot_recs('pharm1','A')
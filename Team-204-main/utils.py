import xml.etree.ElementTree as ET
import pandas as pd
import dask.dataframe as dd

import logging
import time
from pathlib import Path
import numpy as np


def clean_type(df, _type):
    name = str(_type)
    try:
        unit = df[df["type"] == name]["unit"].astype(str).dropna().compute().iloc[0]
        logging.info(f"Detected unit: {unit} for type: {_type}")
    except Exception as e:
        logging.info(f"Cannot detect unit for type: {_type}")
        logging.debug(e)
        unit = "NO_UNIT"
    name = name.replace("HKQuantityTypeIdentifier", "").replace(
        "HKCategoryTypeIdentifier", ""
    )
    i = 1
    while i < len(name):
        if name[i].isupper() and name[i - 1].islower():
            name = name[:i] + " " + name[i:]
            i += 1
        i += 1
    name += f" ({unit})"
    return name.strip()


def clean_types(df):
    mapping = {_type: clean_type(df, _type) for _type in df["type"].unique()}
    return df.assign(type=df["type"].cat.rename_categories(mapping))


def parse_xml(filepath):
    logging.debug("Parsing XML Element Tree")
    tree = ET.parse(filepath)

    logging.debug("Getting root")
    root = tree.getroot()
    record_list = [x.attrib for x in root.iter("Record")]

    logging.debug("Creating Dask DataFrame")
    df = dd.from_pandas(pd.DataFrame(record_list), npartitions=10)

    logging.debug("Assigning dates and converting to numeric")
    df = df.assign(
        creationDate=lambda x: dd.to_datetime(x["creationDate"]),
        startDate=lambda x: dd.to_datetime(x["startDate"]),
        endDate=lambda x: dd.to_datetime(x["endDate"]),
        value=lambda x: dd.to_numeric(x["value"], errors="coerce"),
    )

    dtype = {
        "type": "category",
        "sourceName": "category",
        "sourceVersion": "category",
        "unit": "category",
        "value": "float32",
        "device": "str",
    }

    return df.astype(dtype)


def parse_csv(filepath):
    df = dd.read_csv(
        filepath,
        dtype={
            "type": "category",
            "sourceName": "category",
            "sourceVersion": "category",
            "unit": "category",
            "value": "float32",
            "device": "str",
        },
    )
    df = df.assign(
        creationDate=lambda x: dd.to_datetime(x["creationDate"]),
        startDate=lambda x: dd.to_datetime(x["startDate"]),
        endDate=lambda x: dd.to_datetime(x["endDate"]),
    )
    return df


def ts_type(df, _type, resample="1D", resample_agg="sum"):
    try:
        _df = df[df["type"] == _type].set_index("startDate", sorted=True)["value"].rename(_type)

        if 'count/min' in _type.lower() or '%' in _type.lower() or "/" in _type.lower():
             return (_df
                    .resample("1D")
                    .agg("mean")
                    .compute()
                    )
            
        else:
            return (_df
                    .resample("1D")
                    .agg("sum")
                    .compute()
                    )
            
    except Exception as e:
        logging.debug(e)
        logging.info(f"{_type} not found in dataframe")


def prompt(df):
    features = ['Heart Rate (count/min)', 'Resting Heart Rate (count/min)', 'Oxygen Saturation (%)', 'Respiratory Rate (count/min)', 'Active Energy Burned (Cal)', 'Step Count (count)']

    df_2024 = df[df['startDate'].dt.year == 2024]

    result = "Health Data Summary (2024):\n"

    for feature in features:

        try:
            data = df_2024[df_2024['type'] == feature]['value'].dropna()

            mean_val = data.mean().compute()
            std_val = data.std().compute()
            min_val = data.min().compute()
            max_val = data.max().compute()
            count = data.count().compute()

            result += (
                f"\nFeature: {feature}: Mean: {mean_val:.2f}, StdDev: {std_val:.2f}, Min: {min_val:.2f}, Max: {max_val:.2f}, Count: {count}\n"
            )
        except Exception as e:
            result += f"\nFeature: {feature} - Error calculating stats: {str(e)}\n"
    return result

if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG)

    # local_parquet_path = "data/carter_export.parquet"
    
    # df = dd.read_parquet(local_parquet_path)
    # df.to_parquet("s3://bucketeer-50917d91-a8dc-4c58-9970-d298294a62ca/carter_export.parquet", write_index=False, overwrite=True, schema={'sourceVersion': 'str'}, write_metadata_file=True)
    # print(df['type'].astype(str).nunique().compute())

    # df = dd.read_parquet("s3://bucketeer-50917d91-a8dc-4c58-9970-d298294a62ca/carter_export.parquet")
    # print(df['type'].astype(str).nunique().compute())
    # _df = df[df["type"] == 'Heart Rate (count/min)'].set_index("startDate", sorted=True)["value"].rename('Heart Rate (count/min)')
    # print(_df.resample('1D').agg('mean').compute())

    # data_dir = Path("data")
    # filename = "carter_export.xml"
    # filestem = filename.split(".")[0]
    # filepath = data_dir / filename

    # logging.info("Parsing XML file")
    # start_time = time.time()
    # df = parse_xml(filepath)
    # end_time = time.time()
    # logging.info(f"Time taken to parse XML: {end_time - start_time} seconds")

    # logging.info("Parsing CSV file")
    # start_time = time.time()
    # df = parse_csv(filepath)
    # end_time = time.time()
    # logging.info(f"Time taken to parse CSV: {end_time - start_time} seconds")

    # logging.info("Cleaning types")
    # start_time = time.time()
    # df = clean_types(df)
    # end_time = time.time()
    # logging.info(f"Time taken to clean types: {end_time - start_time} seconds")

    # print(df['type'].astype(str).unique().compute())

    # logging.info("Writing to parquet")
    # start_time = time.time()
    # df.compute().to_parquet(data_dir / f"{filestem}.parquet")
    # end_time = time.time()
    # logging.info(f"Time taken to write to parquet: {end_time - start_time} seconds")

    # logging.info("Reading from parquet")
    # start_time = time.time()
    # df = dd.read_parquet(data_dir / f"{filestem}.parquet")
    # end_time = time.time()
    # logging.info(f"Time taken to read from parquet: {end_time - start_time} seconds")

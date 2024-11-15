from synth import *

def getall_df(MAXLAT, MAXLONG):

    meds_df = gen_medications(med_count=10)
    cs_df = gen_clients(
        meds_df['Medicine'], 
        client_count=100, 
        MAXLAT=MAXLAT, 
        MAXLONG=MAXLONG, 
        MAX_DOSAGE=3
    )
    rx_df = gen_pharmacies(pharmacy_count=10,                   
        MAXLAT=MAXLAT,
        MAXLONG=MAXLONG
    )

    cs_df = assign_pharmacies(cs_df, rx_df)
    cs_df = join_lifespan(cs_df, meds_df)
    rx_df = find_pharmacy_demand(cs_df, rx_df)

    return meds_df, cs_df, rx_df

if __name__ == "__main__":
    getall_df(MAXLAT=256, MAXLONG=256)
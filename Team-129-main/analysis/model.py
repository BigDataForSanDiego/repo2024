import numpy as np # type: ignore
from sklearn.preprocessing import OneHotEncoder, StandardScaler # type: ignore
from sklearn.model_selection import train_test_split # type: ignore
from tensorflow.keras.models import Sequential # type: ignore
from tensorflow.keras.layers import Input, Conv1D, Flatten, Dense # type: ignore
from tensorflow.keras.optimizers import Adam # type: ignore

def predict_demand(rec_df):
    """
    Create CNN to predict future demand based on current demand.
    """
    pharmacy_encoder = OneHotEncoder(sparse=False)
    pharmacy_encoded = pharmacy_encoder.fit_transform(rec_df[['name']])

    # Create input
    X = np.hstack([
        pharmacy_encoded,
        rec_df[['stock', 'time']].values.sum()
    ])
    y = rec_df['demand'].values.sum()

    # Feature Scaling
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # Reshape X for CNN input (samples, timesteps, features)
    # Since we don't have time steps, we'll reshape it to (samples, features, 1)
    X_cnn = X_scaled.reshape(X_scaled.shape[0], X_scaled.shape[1], 1)

    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(
        X_cnn, y, test_size=0.1, random_state=42
    )

    # Build the CNN model
    model = Sequential()
    model.add(Conv1D(filters=64, kernel_size=2, activation='relu', input_shape=(X_cnn.shape[1], 1)))
    model.add(Flatten())
    model.add(Dense(50, activation='relu'))
    model.add(Dense(1))

    # Compile the model
    model.compile(optimizer=Adam(learning_rate=0.001), loss='mean_squared_error')

    # Train the model
    model.fit(X_train, y_train, epochs=50, batch_size=16, validation_data=(X_test, y_test))

    return model

def predict_supply(rec_df):
    """
    Create CNN to predict future supply based on current demand.
    """
    pharmacy_encoder = OneHotEncoder(sparse=False)
    pharmacy_encoded = pharmacy_encoder.fit_transform(rec_df[['name']])

    # Create input
    X = np.hstack([
        pharmacy_encoded,
        rec_df[['stock', 'time']].values.sum()
    ])
    y = rec_df['stock'].values.sum()

    # Feature Scaling
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # Reshape X for CNN input (samples, timesteps, features)
    # Since we don't have time steps, we'll reshape it to (samples, features, 1)
    X_cnn = X_scaled.reshape(X_scaled.shape[0], X_scaled.shape[1], 1)

    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(
        X_cnn, y, test_size=0.1, random_state=42
    )

    # Build the CNN model
    model = Sequential()
    model.add(Conv1D(filters=64, kernel_size=2, activation='relu', input_shape=(X_cnn.shape[1], 1)))
    model.add(Flatten())
    model.add(Dense(50, activation='relu'))
    model.add(Dense(1))

    # Compile the model
    model.compile(optimizer=Adam(learning_rate=0.001), loss='mean_squared_error')

    # Train the model
    model.fit(X_train, y_train, epochs=50, batch_size=16, validation_data=(X_test, y_test))

    return model

def predict_excess(rec_df, X):
    """
    Predict the excess amount of medicine based on the demand and stock cnns.
    """

    stock_model = predict_supply(rec_df)
    demand_model = predict_demand(rec_df)

    return stock_model.predict(X) - stock_model.predict(X)
---
layout: page
title: MediLink
subtitle: Connecting Healthcare Worldwide
sitemap:
  priority: 0.99
---
# MediToken Interface Mockup

<div class="meditoken-container">
    <!-- Left Body Section -->
    <div class="meditoken-body-section">
        <h3>Body</h3>
        <div class="meditoken-body-diagram">
            <img src="https://via.placeholder.com/80x200.png?text=Body" alt="Body Diagram">
        </div>
        <div class="meditoken-body-details">
            <p>Blood Type: A+</p>
            <p>Special Conditions: None</p>
            <p>Other Info: ...</p>
        </div>
    </div>

    <!-- Right Search Section -->
    <div class="meditoken-search-section">
        <h3>Q Search</h3>
        <div class="meditoken-search-box">
            <input type="text" placeholder="Search...">
        </div>
        <div class="meditoken-info-list">
            <p>Prescriptions: ...</p>
            <p>Financial Aid? ...</p>
            <p>Other aspects: ...</p>
        </div>
        <div class="meditoken-button-container">
            <button class="meditoken-button">Doc Notes</button>
            <button class="meditoken-button">Update</button>
        </div>
        <div class="meditoken-insurance-section">
            <p>Tick ✓</p>
            <p>Insurance</p>
        </div>
    </div>
</div>

<style>
    .meditoken-container {
        display: flex;
        width: 600px;
        height: 400px;
        background-color: white;
        border: 2px solid #000;
        margin: 20px auto;
        padding: 10px;
    }
    .meditoken-body-section {
        flex: 1;
        border-right: 2px solid #000;
        padding: 10px;
    }
    .meditoken-body-section h3 {
        margin: 0 0 10px 0;
    }
    .meditoken-body-diagram {
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .meditoken-body-diagram img {
        width: 80px;
    }
    .meditoken-body-details {
        margin-top: 20px;
    }
    .meditoken-body-details p {
        margin: 5px 0;
    }
    .meditoken-search-section {
        flex: 2;
        padding: 10px;
    }
    .meditoken-search-section h3 {
        margin-top: 0;
    }
    .meditoken-search-box {
        margin-bottom: 20px;
    }
    .meditoken-search-box input {
        width: 90%;
        padding: 8px;
        font-size: 16px;
    }
    .meditoken-info-list p {
        margin: 10px 0;
    }
    .meditoken-button-container {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }
    .meditoken-button {
        padding: 10px;
        border: 2px solid #000;
        background-color: #fff;
        cursor: pointer;
        font-size: 14px;
    }
    .meditoken-insurance-section {
        text-align: right;
        margin-top: 10px;
        font-size: 12px;
    }
</style>
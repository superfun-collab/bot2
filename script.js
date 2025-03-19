/* 保留原有的樣式 */
/* ... */

.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 1001;
}

.modal-content {
    background-color: white;
    padding: 30px;
    border-radius: 8px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
}

.input-field {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.submit-btn {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.register-link {
    margin-top: 15px;
    text-align: center;
}

.register-link span {
    color: #007bff;
    cursor: pointer;
}

.back-btn {
    cursor: pointer;
    color: #333;
    font-weight: bold;
}

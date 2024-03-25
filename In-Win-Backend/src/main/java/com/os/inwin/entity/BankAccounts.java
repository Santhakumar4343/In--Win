package com.os.inwin.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class BankAccounts {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String bankName;
	private String accountHolderName;
	private String accountNumber;
	private String ifscCode;
	private String branch;
	private String accountType;
	private String userName;
	public BankAccounts() {
		super();
		// TODO Auto-generated constructor stub
	}
	public BankAccounts(long id, String bankName, String accountHolderName, String accountNumber, String ifscCode,
			String branch, String accountType, String userName) {
		super();
		this.id = id;
		this.bankName = bankName;
		this.accountHolderName = accountHolderName;
		this.accountNumber = accountNumber;
		this.ifscCode = ifscCode;
		this.branch = branch;
		this.accountType = accountType;
		this.userName = userName;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getBankName() {
		return bankName;
	}
	public void setBankName(String bankName) {
		this.bankName = bankName;
	}
	public String getAccountHolderName() {
		return accountHolderName;
	}
	public void setAccountHolderName(String accountHolderName) {
		this.accountHolderName = accountHolderName;
	}
	public String getAccountNumber() {
		return accountNumber;
	}
	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}
	public String getIfscCode() {
		return ifscCode;
	}
	public void setIfscCode(String ifscCode) {
		this.ifscCode = ifscCode;
	}
	public String getBranch() {
		return branch;
	}
	public void setBranch(String branch) {
		this.branch = branch;
	}
	public String getAccountType() {
		return accountType;
	}
	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	
	
}

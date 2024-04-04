package com.os.inwin.dto;

public class OtpDto {
    private String email;
    private String otp;
	public OtpDto(String email, String otp) {
		super();
		this.email = email;
		this.otp = otp;
	}
	public OtpDto() {
		super();
	
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getOtp() {
		return otp;
	}
	public void setOtp(String otp) {
		this.otp = otp;
	}

    
}


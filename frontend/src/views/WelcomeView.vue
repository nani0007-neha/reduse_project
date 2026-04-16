<template>
	<div :class="$style.welcomepageParent">
		<div :class="$style.welcomepage">
			<div :class="$style.div">
				<div :class="$style.main">
					<div :class="$style.header">
						<div :class="$style.div2">
							<div :class="$style.div3">
								<img :class="$style.divIcon" src="@/assets/Wel_hand.jpg" alt="Hand holding plant" />
							</div>
							<div :class="$style.div4">
								<div :class="$style.divNode00">
									<div :class="$style.heroTitle">
										<span :class="$style.heroTitleTxtContainer">
											<b>Buy </b>
											<span :class="$style.less">Less, </span>
											<b>Use </b>
											<span :class="$style.less">Again, </span>
											<b>Live </b>
											<span :class="$style.less">Wisely</span>
										</span>
									</div>
									<div :class="$style.div5">
										<div :class="$style.heroDescription">A platform built for Australian shared
											communities to manage consumption responsibility and connect with others.
										</div>
										<!-- <div :class="$style.div6">
											<div :class="$style.a">
												<div>Learn More Below ↓</div>
											</div>
										</div> -->
									</div>
								</div>
							</div>
						</div>
					</div>

					<div :class="$style.section">
						<div :class="$style.div7">
							<div :class="$style.h2">
								<b :class="$style.sectionHeader">What You Can Do Here</b>
							</div>
							<div :class="$style.div8">
								<div :class="$style.div9">
									<div :class="$style.subheader">How to build a Eco-smarter Lifestyle?</div>
								</div>
							</div>
							<div :class="$style.div10">
								<div :class="$style.divNode002">
									<img :class="$style.WelFridgeIcon" src="@/assets/Wel_fridge.png"
										alt="Fridge Icon" />
									<div :class="$style.div11">
										<b :class="$style.sectionTitle1">Food Wisdom</b>
										<div :class="$style.sectionDescription">Explore recipes, professional storage
											and disposal tips for common food categories.</div>
									</div>
								</div>
								<div :class="$style.divNode003">
									<img :class="$style.WelFridgeIcon" src="@/assets/Wel_closet.png"
										alt="Closet Icon" />
									<div :class="$style.div12">
										<b :class="$style.sectionTitle2">Conscious Clothing</b>
										<div :class="$style.sectionDescription2">Find ethical donation points or second
											hands shops, learn how to repair it and browse sustainable washing guides.
										</div>
									</div>
								</div>
								<div :class="$style.divNode004">
									<img :class="$style.WelHouseholdIcon" src="@/assets/Wel_device.png"
										alt="Devices Icon" />
									<div :class="$style.div13">
										<b :class="$style.sectionTitle3">Smart Households</b>
										<div :class="$style.sectionDescription3">Locate E-waste recycling bins, battery
											disposal points, local tool libraries for shared equipment info and donation
											site.</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div :class="$style.section2">
						<div :class="$style.div14">
							<div :class="$style.sectionTitle4">
								<b :class="$style.howIt">How it </b>
								<span :class="$style.works">Works</span>
							</div>
							<div :class="$style.div15">
								<div :class="$style.divNode011">
									<div :class="$style.stepNumber">01</div>
									<div :class="$style.div21">
										<b :class="$style.stepTitle">Explore</b>
										<div :class="$style.stepDescription">Surf in this All-In-One Info Hubs for Food,
											Textiles and Household goods.</div>
									</div>
								</div>
								<div :class="$style.divNode012">
									<div :class="$style.stepNumber">02</div>
									<div :class="$style.div21">
										<b :class="$style.stepTitle">Learn & Act</b>
										<div :class="$style.stepDescription">Follow step-by-step guides on daily life
											hacks, storage repair and ethical disposal</div>
									</div>
								</div>
								<div :class="$style.divNode013">
									<div :class="$style.stepNumber">03</div>
									<div :class="$style.div33">
										<b :class="$style.stepTitle">Connect & Share</b>
										<div :class="$style.stepDescription3">Find verified links to recycling hubs &
											community services</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div :class="$style.section3">
					<div :class="$style.div34">
						<div :class="$style.h22">
							<b :class="$style.slogan">Why choosing a sustainable living</b>
						</div>
						<div :class="$style.div35">
							<div :class="$style.subheader">
								<b>The </b>
								<span :class="$style.less">Real and Massive Impact</span>
								<span :class="$style.less"> :(</span>
							</div>
						</div>

						<div :class="$style.div37">
							<div :class="$style.divNode005">
								<b :class="$style.statNumber">7.6 M tonnes</b>
								<b :class="$style.statTitle">Annual Food Waste</b>
								<a href="https://www.dcceew.gov.au/environment/protection/waste/national-waste-reports"
									target="_blank" rel="noopener noreferrer" :class="$style.sourceExt">
									Source: DCCEEW National Waste Strategy
								</a>
							</div>

							<div :class="$style.divNode006">
								<b :class="$style.statNumber">&gt; 200, 000 tonnes</b>
								<b :class="$style.statTitle">Clothing to Landfill</b>
								<a href="https://ausfashioncouncil.com/program/seamless/" target="_blank"
									rel="noopener noreferrer" :class="$style.sourceExt">
									Source: Australian Fashion Council
								</a>
							</div>

							<div :class="$style.divNode007">
								<b :class="$style.statNumber">~ 540, 000 tonnes</b>
								<b :class="$style.statTitle">E-Waste Produced</b>
								<a href="https://www.dcceew.gov.au/environment/protection/waste/publications/national-waste-resource-recovery-reporting"
									target="_blank" rel="noopener noreferrer" :class="$style.sourceExt">
									Source: National waste and resource recovery report 2024
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style module>
/* Root Styling */
.welcomepageParent {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	color: #2e2f35;
	font-family: Inter;
	overflow-x: hidden;
}

.welcomepage {
	width: 100%;
	min-height: 100vh;
	background-color: #fff;
	display: flex;
	flex-direction: column;
}

.div {
	width: 100%;
	display: flex;
	flex-direction: column;
	background-color: #e0f8f2;
}

.main {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
}

/* Header/Hero */
.header {
	width: 100%;
	background-color: #e0f8f2;
	display: flex;
	justify-content: center;
	padding: clamp(40px, 8vw, 100px) 5%;
}

.div2 {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	gap: 40px;
	max-width: 1400px;
	width: 100%;
}

.div3 {
	flex: 1;
	min-width: 300px;
	display: flex;
	justify-content: center;
}

.divIcon {
	max-width: 100%;
	height: auto;
	border-radius: 20px;
}

.div4 {
	flex: 1;
	min-width: 320px;
	text-align: left;
}

.heroTitle {
	line-height: 1.1;
	font-size: clamp(36px, 6vw, 82px);
}

.heroDescription {
	font-size: clamp(16px, 1.5vw, 20px);
	line-height: 1.6;
	color: #58595d;
	margin: 25px 0;
}

/* Common Section Styling */
.section,
.section2,
.section3 {
	width: 100%;
	padding: clamp(40px, 6vw, 80px) 5%;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.section {
	background-color: #fff;
}

.section2 {
	background-color: #e3f8f8;
}

.section3 {
	background-color: #fff;
}

.div7,
.div14,
.div34 {
	width: 100%;
	max-width: 1300px;
	display: flex;
	flex-direction: column;
	align-items: center;
}

/* grids */
.div10,
.div15,
.div37 {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 2rem;
	width: 100%;
	margin-top: 40px;
}

/* scaling */
.sectionHeader,
.slogan,
.sectionTitle4 {
	font-size: clamp(32px, 4vw, 64px);
	margin-bottom: 10px;
}

.subheader {
	font-family: 'Covered By Your Grace';
	font-size: clamp(24px, 4vw, 70px);
	color: #009387;
	margin-bottom: 20px;
}

/* what cards */
.divNode002,
.divNode003,
.divNode004,
.divNode005,
.divNode006,
.divNode007 {
	flex: 1 1 320px;
	max-width: 410px;
	padding: 40px 25px;
	border-radius: 13px;
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 20px;
}

/* what cards bkgd */
.divNode002,
.divNode005 {
	background-color: #fdf3ea;
}

.divNode003,
.divNode006 {
	background-color: #e0f8f2;
}

.divNode004,
.divNode007 {
	background-color: #eeecff;
}

/* what cards bkgd styling */
.sectionTitle1,
.sectionTitle2,
.sectionTitle3,
.statTitle {
	font-size: 28px;
	margin-bottom: 15px;
	display: block;
}

.works {
	font-size: clamp(40px, 4vw, 80px);
	margin-bottom: 10px;
	font-family: 'Covered By Your Grace';
	color: #009387;
}

.sectionDescription,
.sectionDescription2,
.sectionDescription3 {
	font-size: 16px;
	line-height: 1.5;
	color: #58595d;
	margin-bottom: 30px;
	flex-grow: 1;
}

.WelFridgeIcon,
.WelHouseholdIcon {
	width: 60px;
	height: auto;
}

/* impact stat */
.statNumber {
	font-size: clamp(28px, 3vw, 36px);
	color: #009387;
	margin-bottom: 10px;
}

.sourceDcceewNational {
	font-size: 14px;
	color: #888;
	margin-top: 10px;
}

/* steps - how */
.divNode011,
.divNode012,
.divNode013 {
	flex: 1 1 300px;
	display: flex;
	gap: 20px;
	align-items: flex-start;
	text-align: left;
}

.stepNumber {
	font-family: 'Covered By Your Grace';
	font-size: 48px;
	color: #009387;
}

.stepTitle {
	font-size: 32px;
	margin-bottom: 8px;
}

.stepDescription {
	font-size: 18px;
	line-height: 1.4;
	color: #58595d;
}

/* font */
.less {
	font-family: 'Covered By Your Grace';
	color: #009387;
}

.a {
	display: inline-block;
	background-color: #4ca655;
	border: 2px solid #2e2f35;
	box-shadow: 3px 3px 0px #2e2f35;
	border-radius: 15px;
	padding: 15px 35px;
	cursor: pointer;
}

.heroButton {
	color: #fff;
	text-transform: uppercase;
}
</style>
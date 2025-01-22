---
publishDate: 'Nov 2024'
title: 'Emission and Absorption Spectroscopic Techniques for Characterizing Perovskite Solar Cells'
description: |
  In the research of perovskite solar cells (PSCs), a fundamental understanding of the photoelectric conversion process is crucial for exploring mechanisms and optimizing performance, which largely relies on accurately capturing experimental phenomena. Spectral techniques, especially photoluminescence (PL) spectroscopy, time-resolved photoluminescence (TRPL) spectroscopy, photoluminescence quantum yield (PLQY) measurement, photoluminescence (PL) mapping spectroscopy, and transient absorption (TA) spectroscopy, are highly valued for their ability to provide detailed information about the material's working state. In this Review, we provide an overview of the latest advancements in these spectral techniques in PSC research. We demonstrate their advantages in monitoring the reconstruction of electronic structure, carrier dynamics, evolution of interfacial states, and separation of photogenerated charges in PSCs. Additionally, we discuss how to interpret the underlying physical and chemical processes in perovskite materials based on these spectral characterizations. Ultimately, we look forward to these techniques providing deeper insights into the further development of PSCs and their application in the field of renewable energy.
image: 'https://s2.loli.net/2025/01/13/DIUNyFfRi354gQP.png'
link: 'http://dx.doi.org/10.1021/acs.jpcc.4c06770'
tags: [markdown, publication, spectroscopy, solar-cells, perovskite]
journal: 'American Chemical Society'
journalShort: 'ACS'
author: [Zongxuan Yuan, Meifang Yang, Lei Zhang, WenGuang Li, Tian Tian*, Huan Pang*]
---

<script>
    import Image from 'next/image';
</script>

## Emission and Absorption Spectroscopic Techniques for Characterizing Perovskite Solar Cells

Published as part of _[**The Journal of Physical Chemistry C**](http://dx.doi.org/10.1021/acs.jpcc.4c06770)_ special issue "Spectroscopic Techniques for Renewable Energy".

Zongxuan Yuan, Meifang Yang, Lei Zhang, Wen-Guang Li, Tian Tian*, and Huan Pang*

<div class="publication-container">
        <Image src="https://s2.loli.net/2025/01/13/DIUNyFfRi354gQP.png" alt="Spectroscopic techniques diagram for PSCs"  class="mx-auto my-0 w-full max-w-lg" width="1000" height="1000" loading="lazy" />
    <div class="abstract">
        <h3>ABSTRACT</h3>
    In the research of perovskite solar cells (PSCs), a fundamental understanding of the photoelectric conversion process is crucial for exploring mechanisms and optimizing performance, which largely relies on accurately capturing experimental phenomena. Spectral techniques, especially photoluminescence (PL) spectroscopy, time-resolved photoluminescence (TRPL) spectroscopy, photoluminescence quantum yield (PLQY) measurement, photoluminescence (PL) mapping spectroscopy, and transient absorption (TA) spectroscopy, are highly valued for their ability to provide detailed information about the material's working state. In this Review, we provide an overview of the latest advancements in these spectral techniques in PSC research. We demonstrate their advantages in monitoring the reconstruction of electronic structure, carrier dynamics, evolution of interfacial states, and separation of photogenerated charges in PSCs. Additionally, we discuss how to interpret the underlying physical and chemical processes in perovskite materials based on these spectral characterizations. Ultimately, we look forward to these techniques providing deeper insights into the further development of PSCs and their application in the field of renewable energy.
    </div>
</div>

### 1. INTRODUCTION

The pursuit of sustainable and renewable energy sources has been a focal point for the scientific community for decades. In light of the global challenges posed by climate change and the gradual depletion of fossil fuel reserves, researchers are dedicated to developing clean and efficient energy conversion solutions, which have become a paramount priority in scientific inquiry.<sup><a href="#ref1">1</a></sup> Solar energy, as a prominent renewable source, is particularly emphasized due to its abundance, cleanliness, and sustainability. It offers a continuous energy source with minimal environmental impact during usage.<sup><a href="ref2">2</a></sup> Over recent years, various methods for harnessing solar energy have emerged, including solar heating,<sup><a href="#ref3">3</a></sup> artificial photosynthesis,<sup><a href="#ref4">4</a></sup>photovoltaics (PV),<sup><a href="#ref5">5</a></sup> and photocatalytic decomposition.<sup><a href="#ref6">6</a></sup> Among them, photovoltaic technology has garnered significant attention for its effectiveness in converting solar energy into electrical energy. PV systems mostly work on the principle that when light strikes a semiconductor material (e.g., silicon,<sup><a href="#ref7">7</a></sup>,<sup><a href="#ref8">8</a></sup> chalcogenide,<sup><a href="#ref9">9</a></sup> <sup><a href="#ref10">10</a></sup>organic PV<sup><a href="#ref11">11</a></sup>,<sup><a href="#ref12">12</a></sup>), it excites electrons to transition from the valence band to the conduction band, thereby generating free electrons and holes. In the presence of an electric field, these charge carriers migrate in opposite directions, forming an electric current. According to the development of solar cell technology, the materials used in it can be categorized into three generations ([Figure 1](#figure_1)). Among them, perovskite solar cells (PSCs) demonstrate remarkable PV performance due to their high absorption coefficients,<sup><a href="#ref14">14</a></sup> efficient bipolar carrier transport capabilites,<sup><a href="#ref15">15</a></sup> long carrier diffusion lengths and prolonged carrier lifetimes.<sup><a href="#ref16">16</a></sup> The typical PSCs consist of several key components: a transparent conductive substrate (TCO), an electron transport layer (ETL), a perovskite (PVK) absorber layer, a hole transport layer (HTL) and a metal back electrode. When sunlight strikes PSCs, the PVK absorber layer absorbs light energy, generating electron−hole pairs. These charge carriers are rapidly separated by the built-in electric field, with the electrons migrating toward the ETL and the holes moving to the HTL. The ETL and the HTL are composed of n-type and p-type semiconductor materials, respectively, which provide efficient transport pathways for the electrons and holes. Consequently, the separated electrons and holes are collected at the TCO and metal back electrodes, respectively, forming a current that can be harnessed through an external circuit.<sup><a href="#ref17">17</a></sup>

<a id="figure_1"></a>
<Image src="https://s2.loli.net/2025/01/15/FDgYOnC4eNfqczm.png" alt="12123" class="mx-auto my-0 w-full max-w-lg" width="1000" height="1000" loading="lazy" />

<div class="w-full text-center text-sm">
    <strong>Figure 1.</strong> Three generations of PV cells.<sup><a href="#ref13">13</a></sup> Adapted with permission from ref 13. Copyright 2023 Royal Society of Chemistry.
</div>

<a id="figure_2"></a>
<Image src="https://s2.loli.net/2025/01/15/uyJ2FYWzT69LRds.png" alt="12123" class="mx-auto my-0 w-full max-w-lg" width="1000" height="1000" loading="lazy" />

<div class="w-full text-center text-sm">
    <strong>Figure 2.</strong> Mechanism diagram.<sup><a href="#ref25">25</a></sup> Adapted with permission from ref 25. Copyright 2019 Nature Publishing Group.
</div>

Spectroscopic techniques play a crucial role in PSCs characterization. These characterization methods enable the detection of defects and carrier complexes within the materials,<sup><a href="#ref18">18</a></sup>−<sup><a href="#ref20">20</a></sup> as well as the investigation of interfacial properties between the various layers.<sup><a href="#ref21">21</a></sup>,<sup><a href="#ref22">22</a></sup> As the research progresses, there is an increasing demand for more advanced spectroscopic characterization techniques that can provide insights into the PV performance of PSCs at the molecular/atomic level. Spectroscopists have developed a range of optical analytical methods for assessing optical properties of materials, which are inherently linked to their fundamental characteristics. This article presents a comprehensive overview of recent advancements in spectroscopic characterization techniques specific to PSCs. It begins with a discussion of the basic principles and equipment necessary for each type of spectral analysis technique. Subsequently, we delve into recent research developments in these spectroscopic methods, illustrated with typical case studies. Finally, we envision the potential applications of these techniques in future research endeavors related to PSCs.

## 2. Overview Of Spectroscopic Techniques

**2.1. Photoluminescence (PL) Spectroscopy.** PL spectroscopy is a sensitive optical detection technique that utilizes a light source to excite molecules in a sample, causing them to transition from their ground state to a higher excited state. While in the excited state, the molecules often experience nonradiative energy loss through internal transitions and internal crossovers before returning to the ground state. The phenomenon of this energy being released in the form of photons with longer wavelengths is called photoluminescence or phosphorescence ([Figure 2](#figure_2)). By accurately measuring the intensity of this emitted light, the PL spectrum obtained, it included properties and state of existence of the molecule involved.<sup><a href="#ref23">23</a></sup>,<sup><a href="#ref24">24</a></sup> PL spectrum consists of an excitation (Ex) spectrum and an emission (Em) spectrum, reflecting the vibrational energy level structure of the ground and excited state, respectively. The Ex spectrum often referred to as the absorption spectrum, illustrates the transition of electrons from a lower energy state to a higher energy state upon absorbing light energy. The total energy within a molecule as it absorbs light energy and excites is formed by the superposition of some different energy states.<sup><a href="#ref26">26</a></sup>

<a id="figure_3"></a>
<Image src="https://s2.loli.net/2025/01/15/uxDyK3P2pfz6otq.png" alt="12123" class="mx-auto my-0 w-full max-w-lg" width="1000" height="1000" loading="lazy" />

<div class="w-full text-center text-sm">
    <strong>Figure 3.</strong> Scheme for the TRPL.<sup><a href="#ref39">39</a></sup> Adapted with permission from ref 39. Copyright 2022 Springer.
</div>

<div class="equation-container">
    <div class="equation">
        E(total) = E(translation) + E(rotation) + E(vibration) + E(electronic) + E(electronic orientation of spin) + E(nuclear orientation of spin)
    </div>
    <div class="equation-number">(1.1)</div>
</div>

<style>
.equation-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1em 0;
    font-style: italic;
}
.equation {
    margin-right: 10px;
}
.equation-number {
    margin-left: 10px;
}
</style>

E(total): Total energy inside the molecule.
<br />
E(translation): Translational energy, the energy produced by the movement of molecules.
<br />
E(rotation): Rotational energy, by the rotation of molecules around their center of mass.
<br />
E(vibration): Vibrational energy, the energy produced by the periodic deviation of an atom from its equilibrium position.
<br />
E(electronic): Electron energy, the energy produced by the movement of electrons in a chemical bond.
<br />
E(electronic orientation of spin): Electron spin orientation energy.
<br />
E(nuclear orientation of spin): Atomic nucleus spin orientation energy.
<br />
When a molecule absorbs photon energy, it influences its level energy of rotational states and vibrational modes. During PL and phosphorescence emission, these energy levels release energy. The most prominent features of the spectrum primarily the major peaks, correlate directly with transitions in the electron energy levels, while additional spectral lines arise from the rotational and vibrational transitions of the molecules.<sup><a href="#27">27</a></sup> PL Em spectroscopy describes the distribution of wavelengths or frequencies of light released when a substance transitions from an excited state to a lower energy state. The light produced in this process can be spontaneous, manifesting as PL or phosphorescence Generally, the energy of the emitted photons is generally lower than that of the initially absorbed photons, as molecules release energy through various pathways after absorbing it, often resulting in photon emission. Therefore, the energy of the emitted light typically has a longer wavelength than the excitation light, indicating lower energy.<sup><a href="#28">28</a></sup> A phenomenon known as the Stokes shift, was first described by G.G. Stokes in 1852.<sup><a href="#29">29</a></sup> This characteristic energy loss between excitation and emission is commonly observed for fluorescent molecules in solution (Lakowicz, 1999). The Stokes shift occurs due to the rapid transition of the molecule to the lowest vibrational level of the excited state (S1) and subsequent decay from higher vibrational levels to the ground state (S0), with the excess excitation energy typically converted into thermal energy.<sup><a href="#30">30</a></sup>

**2.2. Time-Resolved Photoluminescence (TRPL) Spectroscopy.** TRPL spectroscopy is an advanced characterization technique used to study excited-state dynamics in materials.<sup><a href="#31">31</a></sup>−<sup><a href="#33">33</a></sup> By measuring the temporal decay time of PL, TRPL provides insights into the complexation processes of charge
carriers.<sup><a href="#34">34</a></sup>,<sup><a href="#35">35</a></sup> The TRPL technique is particularly effective for studying charge-carrier dynamics in semiconductors and
molecular systems, offering more detailed information than traditional steady-state PL.<sup><a href="#ref36">36</a></sup>−<sup><a href="#ref38">38</a></sup> TRPL is employed to probe
the radiative process of carries following excitation by short light pulses, typically on the picosecond (ps) or nanoseconds
(ns) time scale ([Figure 3](#figure_3)). The working principle of TRPL involves measuring the time difference between when the
sample is excited by a laser pulse and when the detector captures the fluorescent photon signal emitted by the sample. This process requires the definition of a "start" signal and a "stop" signal. The "start" signal is provided by the synchronized trigger output of the pulsed laser or the pulse output signal of a fast photodiode, while the "stop" signal is achieved by the detection of photon signals by a single-photon detector. By repeatedly measuring this time difference and sorting the detected event times into a histogram based on their arrival times, the decay curve of photoluminescence can be reconstructed ([Figure 3](#figure_3)). TRPL experiments are typically conducted using timecorrelated single photon counting. In this technique, the sample is periodically excited by pulsed lasers that emit light at a specific wavelength. The emitted light is then recorded by a high-speed detector, such as a single-photon counter, over time delays. By analyzing the PL decay curve, the PL lifetime of the material can be determined. Ideally, after each excitation pulse, either 0 or 1 photon is measured, and it typically requires millions to billions of excitation pulses to achieve sufficient signal-to-noise ratio (S/N). Consequently, the TRPL intensity

<a id="figure_4"></a>
<Image src="https://s2.loli.net/2025/01/15/RIOyg2fDekGvb98.png" alt="12123" class="mx-auto my-0 w-full max-w-lg" width="1000" height="1000" loading="lazy" />

<div class="text-sm">
    <strong>Figure 4.</strong>
    <br>
    (a) Schematic depiction of the transient absorption spectroscopy principle.
    <br />
    (b) Right panel: Contributions to a ΔA spectrum: groundstate bleach (dashed line), stimulated emission (dotted line), excited-state absorption (solid line), the sum of these contributions (gray line). Adapted with permission from ref 61. Copyright 2009 Springer.
</div>

measured after P excitation pulses is the accumulation of the TRPL intensities after each excitation pulse P: <sup><a href="#ref37">37</a></sup>

$$
    I_{TRPL}(t) = \sum\limits_{p=1}^{p} I_{TRPL}^{P}(t)
    \tag{1.2}
$$

The TRPL decay curve is typically fitted by a sum of a series
of exponential decays:<sup><a href="#ref40">40</a></sup>

$$
    I_{TRPL}(t) = \sum_{i}^{n} A_i e^{-t/\tau_i}
    \tag{1.3}
$$

_A_<sub>i</sub>: the amplitude of the *i*th component.
<br>
_τ_<sub>i</sub>: the lifetime of the *i*th component.

Thus, by analyzing TRPL decay curves, researchers can gain insight into the multiple radiative and nonradiative composite pathways, which are crucial for understanding the PV mechanisms.<sup><a href="#ref39">39</a></sup>

**2.3. Photoluminescence Quantum Yield (PLQY).** PLQY reflects the efficiency with which the material emits light upon photoexcitation after absorbed photons.<sup><a href="#ref41">41</a></sup> PLQY measurements are divided into absolute PLQY and relative PLQY. Absolute PLQY measurements of the number of emitted and absorbed photons are conducted using an integrating sphere device. An integrating sphere is a large spherical device with its inner walls coated with a layer of highreflectivity material, typically made of barium sulfate or magnesium oxide.<sup><a href="#ref41">41</a></sup> When excitation light enters through an entry port on the sphere, the light emitted by the sample inside the sphere is scattered multiple times and is eventually detected by a sensor through another port. The sample is generally placed at the center of the integrating sphere. To minimize direct light emission from the sample to the detector, a reflective baffle is installed inside the sphere to shield the detector's view. The primary function of the integrating sphere is to use multiple scattering to homogenize the spatial distribution of emitted light, thereby reducing its anisotropy. Additionally, it helps to mitigate errors caused by refractive index and polarization. This method mitigates uncertainties related to the use of intrinsically fluorescent standards, providing a more accurate assessment of the material's luminescent efficiency.<sup><a href="#ref42">42</a></sup>,<sup><a href="#ref43">43</a></sup> Alternatively, the PLQY can be obtained by photoacoustic spectroscopy,<sup><a href="#ref43">43</a></sup> and thermal lensing through dissipation of heat.<sup><a href="#ref44">44</a></sup> Additionally, PLQY can be determined relative to a fluorescence standard with a known quantum yield.<sup><a href="#ref45">45</a></sup> This comparative approach, utilizing a known standard, is a straightforward and cost-effective method, making it widely adopted for the quantitative analysis of quantum yields. However, a limitation of this method is the need to identify a suitable reference standard, which may not apply to all sample types.

**2.4. PL Mapping Spectroscopy.** PL mapping, is a powerful technique for characterizing materials by imaging and analyzing their optical properties at a microscopic scale.<sup><a href="#ref46">46</a></sup> The principles of PL mapping closely mirror those of traditional PL spectroscopy. When a material is excited by light, its electrons transition from lower to higher energy states, absorbing the photon energy and temporarily remaining in an excited state. After a brief period, typically on the nanosecond time scale, the electrons return to their lower energy levels, releasing energy in the form of emitted light.<sup><a href="#ref23">23</a></sup>,<sup><a href="#ref24">24</a></sup> This emission process, known as PL, is characteristic of the material and provides crucial information about its electronic and structural properties.<sup><a href="#ref46">46</a></sup>

The key distinction between PL mapping and conventional PL spectroscopy lies in the imaging method. PL spectroscopy provides averaged data from a single point or a bulk sample, but with the advent of high-quality detector arrays such as charge-coupled device (CCD), the imaging mode has become the method for performing spatially resolved PL. By illuminating the entire sensitive area and collecting data from all spatial positions simultaneously, measurement efficiency can be greatly improved. PL mapping offers spatially resolved information by scanning the surface of material and collecting photoluminescence signals at different locations.<sup><a href="#ref47">47</a></sup> This generates a detailed map of the PL intensity distribution across the sample, enabling researchers to visualize and analyze variations in luminescent properties across the material's surface.

The PL mapping provides valuable insights into the luminescent properties of PSCs, it is including information on defects, impurity distributions, and crystal quality.<sup><a href="#ref48">48</a></sup>−<sup><a href="#ref50">50</a></sup> This technique enables researchers to visualize spatial variations in photoluminescence, facilitating a deeper understanding of the material's structural and electronic characteristics.<sup><a href="#ref51">51</a></sup>,<sup><a href="#ref52">52</a></sup> It is critical for optimizing material performance in applications such as optoelectronics and PV.<sup><a href="#ref53">53</a></sup>,<sup><a href="#ref54">54</a></sup>

**2.5. Transient Absorption (TA) Spectroscopy.** TA spectroscopy is an advanced time-resolved spectroscopic technique that monitors the real-time dynamics of excited states in materials by tracking changes in spectral absorption.

<a id="figure_5"></a>
<Image src="https://s2.loli.net/2025/01/15/jt87eEZmd9I6r5q.png" alt="12123" class="mx-auto my-0 w-full max-w-lg" width="1000" height="1000" loading="lazy" />

<div class="text-sm">
    <strong>Figure 5.</strong> An illustrative example of studying the internal electron movement in PSCs through PL spectroscopy. (a) PL spectra of the TiO<sub>2</sub>/FAPbI<sub>3</sub> and TiO<sub>2</sub>-SK/FAPbI<sub>3</sub> films. Adapted with permission from ref <a href="#ref68">68</a>. Copyright 2024 Wiley-VCH. (b) PL spectra of the PVK films deposited on SnO<sub>2</sub>, SnO<sub>2</sub>/PCBM, and SnO<sub>2</sub>/AHF-4. Adapted with permission from ref <a href="#ref69">69</a>. Copyright 2023 American Chemical Society. (c) PL spectra of PVK films on the TiO<sub>2</sub> and TiO<sub>2</sub>-AS. Adapted with permission from ref <a href="#ref59">59</a>. Copyright 2023 Wiley-VCH. (d) PL spectra of the samples with and without the structure of TB-C8-Ni. Adapted with permission from ref <a href="#ref70">70</a>. Copyright 2024 Elsevier. (e) PL spectra of the FAPbI<sub>3</sub> films deposited on the different types of SnO<sub>2</sub> NC layers. Adapted with permission from ref <a href="#ref71">71</a>. Copyright 2023 Wiley-VCH. (f) The PL spectra of PVK, PVK/TIPS-Pn, and PVK/TIPS-Pn/CB. Adapted with permission from ref <a href="#ref72">72</a>. Copyright 2023 Wiley-VCH.
</div>

upon light excitation.<sup><a href="#ref55">55</a></sup> This method is widely employed to investigate rapid kinetic processes in materials and chemical reactions,<sup><a href="#ref56">56</a></sup> such as charge migration,<sup><a href="#ref57">57</a></sup>,<sup><a href="#ref58">58</a></sup> chemical bond formation and dissociation,<sup><a href="#ref59">59</a></sup> relaxation of molecular structures.<sup><a href="#ref60">60</a></sup> TA spectroscopy used laser pumping and probing, illustrated in [Figure 4](#figure_4).<sup><a href="#ref61">61</a></sup>

The method utilizes a femtosecond pulsed laser, which is split into two beams via a beam splitter. The first beam, a high-energy monochromatic femtosecond pulse, serves as the pump light to excite the sample into its excited state. The second beam, a weaker probe pulse, is passed through the sample with a time delay relative to the pump pulse. The TA spectroscopy technique operates based on the Lambert−Beer law,<sup><a href="#ref62">62</a></sup> which necessitates efficient photon transmission for accurate measurements. High-quality photon transport is essential to ensure precise data acquisition. By measuring the intensity of the probe light after it traverses the sample at varying time delays, the TA spectrum is calculated.

In TA spectroscopy measurements, the changes in absorption (ΔA) are characterized by three primary spectral signals: ground state bleaching (GSB), excited state absorption (ESA), and stimulated emission (SE).<sup><a href="#ref63">63</a></sup> When the pump light irradiates a sample, it excites a fraction of molecules, leading to ground state depletion-a process known as GSB. As a result, fewer molecules are available to absorb the probe light, leading to increased transmission. This increase in transmittance manifests as a negative transient absorption signal, recognized as the GSB signal.

In addition to GSB, ESA occurs when excited molecules absorb additional photons, promoting them to higher energy levels.<sup><a href="#ref59">59</a></sup> This results in a reduction of probe light transmission, producing a positive transient absorption signal. The ESA signal provides critical insights into the ability of excited molecules to absorb more energy and transition to higher excited states, effectively representing the absorption spectrum of the excited-state species. Typically, ESA signals appear rapidly after excitation and are aligned with the absorption peaks observed in the steady-state absorption spectrum of the sample.

SE occurs when molecules in the excited state are stimulated by the probe light to return to their ground state through radiative processes, emitting photons in the process. This emission enhances the transmission of the probe light, leading to a negative transient absorption signal. The SE signal is typically observed in the same wavelength region as the sample's steady-state PL spectrum. Unlike GSB, the SE signal often emerges after a short delay, as it is preceded by relaxation processes before the radiative transition to the ground state takes place. Together, GSB, ESA, and SE signals together provide a comprehensive understanding of the dynamics of excited states within materials.<sup><a href="#ref64">64</a></sup>,<sup><a href="#ref65">65</a></sup> By analyzing these different contributions in TA spectroscopy measurements, researchers can gain valuable insights into the photophysical processes at play, which is crucial for optimizing the performance of advanced materials in applications such as PVs, optoelectronics, and photonics.

## 3. SPECTROSCOPY CHARACTERIZATIOS IN PSCS

**3.1. PL Spectroscopy Characterization in PVK Films.** In PSCs, PL spectroscopy is commonly used to study the transfer efficiency of electrons from the PVK layer to the ETL,<sup><a href="#ref66">66</a></sup> as well as investigate nonradiative recombination processes.<sup><a href="#ref67">67</a></sup>

For instance, Luo et al.<sup><a href="#ref68">68</a></sup> modified the interface between the titanium dioxide (TiO<sub>2</sub>) ETL and the PVK layer with versatile potassium trifluoromethanesulfonate, achieving effective cross-linking that significantly enhanced electron transfer efficiency from the PVK layer to the ETL. In [Figure 5a](#figure_5), the PL intensity of the TiO<sub>2</sub>-SK film is lower than that of the TiO<sub>2</sub> film, indicating that TiO<sub>2</sub> ETLs treated with SK can reduce electron−hole recombination in the PVK layer, thereby more effectively extracting electrons and enhancing the energy conversion efficiency of solar cells. Similarly, the team of

<a id="figure_6"></a>
<Image src="https://s2.loli.net/2025/01/15/cQviMI4rpR65Elq.png" alt="12123" class="mx-auto my-0 w-full max-w-lg" width="1000" height="1000" loading="lazy" />

<div class="text-sm">
    <strong>Figure 6.</strong>
    <br>
    (a) TRPL spectra of PVK films deposited on different ETL. Adapted with permission from ref 73. Copyright 2023 Elsevier.
    <br>
    (b) TRPL spectra of PVK films with different modifications. Adapted with permission from ref 74. Copyright 2024 Nature Publishing Group.
    <br>
    (c) TRPL spectra of PVK films with and without the small molecules. Adapted with permission from ref 75. Copyright 2024 Elsevier.
    <br>
    (d) TRPL spectra of control and reference PVK films on the glass substrate. Adapted with permission from ref 76. Copyright 2024 Elsevier.
    <br>
    (e) TRPL spectra of CsPbI3 and CsPbI3/[CYS][PbCl2] films. Adapted with permission from ref 77. Copyright 2024 Wiley-VCH.
    <br>
    (f) TRPL spectra of control, 2-ThMAImodified, and 3-ThMAI-modified CsSnI3 film. Adapted with permission from ref 78. Copyright 2024 Elsevier.
</div>

Daniel Prochowicz<sup><a href="#ref69">69</a></sup> synthesized a new type of azahomofullerene (AHF-4) and introduced it as an interlayer between the SnO<sub>2</sub> and PVK interfaces. It has been proven to enhance charge transfer capability due to its excellent coordination interaction and electronic coupling with the SnO<sub>2</sub> surface. As shown in [Figure 5b](#figure_5), the PVK film doped with AHF-4 exhibits more significant PL quenching than the [6,6]-phenyl-C61-butyric acid methyl ester (PCBM) layer. This suggests that AHF-4 can efficiently facilitate the extraction and transport of photogenerated charge carriers more efficiently than PCBM, thereby improving the performance of solar cells.

In addition to this, Feng et al.<sup><a href="#ref59">59</a></sup> have effectively created a "bridge" on the surface and at the interface of TiO<sub>2</sub> by modifying it with ammonium sulfamate (AS). The PL intensity of FTO/TiO<sub>2</sub>/AS/PVK is lower than that of FTO/TiO<sub>2</sub>/PVK, indicating that the AS-treated solar cells can more effectively enhance the photoelectron conversion efficiency ([Figure 5c](#figure_5)). Yang et al.<sup><a href="#ref70">70</a></sup> designed a two-dimensional (2D) phthalocyanine-based molecular additive (TB-C8-Ni) to enhance charge carrier transportation and stabilize ions. They found that the devices containing TB-C8-Ni exhibit lower PL intensity compared to the control group, indicating more efficient charge injection in the films containing TB-C8-Ni ([Figure 5d](#figure_5)).

In exploring nonradiative recombination within PSCs devices, Chen et al.<sup><a href="#ref71">71</a></sup> used highly crystalline Cl-doped SnO<sub>2</sub> nanocrystals to form a very stable aqueous dispersion, effectively suppressing the barrier at the buried interface between the PVK and ETL and reducing the density of trap states, reduced nonradiative recombination. As can be seen in [Figure 5e](#figure_5), the PL intensity of the PVK film decreases after doping, which can be attributed to the reduced probability of nonradiative recombination following both internal and external doping. This observation is not an isolated case, Hua et al.<sup><a href="#ref72">72</a></sup> used 6,13-bis(triisopropylsilylethynyl) pentacene (TIPS-Pn) to enhance the performance of solar cells. The in situ combined HTL with TIPS-Pn channels effectively reduces nonradiative recombination. In [Figure 5f](#figure_5), the significant weakening of the PL intensity after the introduction of TIPS-Pn indicates that the TIPS-Pn fibers act as channels, enabling the film to maintain high efficiency in extracting and nonradiative recombination is greatly inhibited by the reduction of defects.

PL spectroscopy plays a crucial role in the research of PSCs, as it not only reveals the charge transfer efficiency between the ETL and the PVK layer but also provides insights into nonradiative recombination processes. By analyzing changes in PL intensity, the impact of different materials and interfacial treatments on charge extraction and recombination behavior can be assessed. PL spectroscopy has become an important tool for understanding and optimizing the performance of PSCs due to its ability to provide direct, real-time information on charge dynamics. As further research and application of PL spectroscopic characteristics continue, it will continue to offer profound insights into the characterization and performance enhancement of solar cell materials.

**3.2. Application of TRPL in PSCs.** In PVK, TRPL can be used to study the carrier dynamics of the materials, including the lifetime of carriers, recombination processes, and the defect states within the materials.<sup>37</sup> TRPL can detect the dynamics of the radiative transition spectrum of excited states in materials over time, which is crucial for understanding the behavior of charge carriers in PVK materials.

Concerning characterizing the polarization coupling of hole-transporting materials, Li et al.<sup><a href="#ref73">73</a></sup> modified SnO<sub>2</sub> with potassium isopropylxanthate (KiPX). The sulfur ligand, due to the presence of Lewis acid centers, interacts strongly with Pb<sup>2+</sup> in the perovskite and Sn<sup>4+</sup> on the SnO<sub>2</sub> surface, resulting in the formation of more robust interfacial dipoles and enhanced charge transfer. As shown in [Figure 6a](#figure_6), the carrier lifetime of KiPX decreases following its modification, indicating that stronger interfacial dipoles are established at the KiPX-modified interfaces. This modification reduces energy band bending in the perovskite region, facilitating electron transfer from the perovskite layer to the SnO<sub>2</sub> ETL. In addition, for the characterization of defect

<a id="figure_7"></a>
<Image src="https://s2.loli.net/2025/01/15/ZcztCqbPBORhLKy.png" alt="12123" class="mx-auto my-0 w-full max-w-lg" width="1000" height="1000" loading="lazy" />

<div class="text-sm">
    <strong>Figure 7.</strong>
    <br>
    (a) Normalized PLQY of glass/PIC/perovskite stacks (indicated as PIC sample) relative to the control sample (PIC concentration 0). Adapted with permission from ref 80. Copyright 2023 AAAS.
    <br>
    (b) PLQY of PVK films on different substrates. Adapted with permission from ref 81. Copyright 2023 AAAS.
    <br>
    (c) Excitation-intensity-dependent PLQY of the Sn PVK films with and without CA. Adapted with permission from ref 82. Copyright 2023 Nature Publishing Group.
    <br>
    (d) PLQY measurements (red circles) on full devices. The kinetic model (light blue) with an error band (gray) explains the measured values reasonably well and the PLQY obtained from SCAPS simulations (orange) are consistent. In orange shadings, they show PLQY values expected for the indicated nonradiative lifetimes when keeping second-order external recombination rate and background doping density constant. Adapted with permission from ref 83. Copyright 2021 Wiley-VCH.
</div>

passivation, Liu et al.<sup><a href="#ref74">74</a></sup> utilized 1,4-butanediamine and ethylenediammonium diiodide (BDA-EDAI<sub>2</sub>) to eliminate Sn-related defects and passivate the organic cation and halide vacancy defects on the surface of the tin−lead mixed PVK film. This approach minimizes the nonradiative energy loss at the perovskite/ETL interface. As shown in [Figure 6b](#figure_6), the combined treatment of BDA-EDAI<sub>2</sub> significantly enhances defect passivation in the perovskite thin film, the BDA-EDAI<sub>2</sub> improves the interface quality between the PVK and the ETL, reducing nonradiative recombination losses attributed to surface defects.

Additionally, Tian et al.<sup><a href="#ref75">75</a></sup> incorporated 2-methoxy-5-trifluoromethylaniline (MFA) into the PVK film, facilitating in situ anion fixation and passivation of under-coordinated Pb during the crystallization process. This modification reduces trap density, increasing grain size, and extends carrier lifetime. In [Figure 6c](#figure_6), incorporation all additives significantly enhanced the carrier lifetime, with the MFA molecule showing a stronger enhancement compared to FA to AL. This is due to the introduction of -OCH<sub>3</sub>, which increases the electron cloud density around the benzene ring, thereby amplifying the passivation effect of the dual passivation groups.

In their study on chemical bonding characterization in PVK devices, Wang and colleagues<sup><a href="#ref76">76</a></sup> successfully developed efficient p-type CsPbI<sub>3</sub> PSCs by incorporating multifunctional eugenol allyl (EAL). The lactate anions facilitated the crystallization of CsPbI<sub>3</sub>, while the conjugated backbone and various functional groups in EAL interacted with I<sup>−</sup> and Pb<sup>2+</sup>, stabilizing its structure and promoting charge transport within the film. As shown in [Figure 6d](#figure_6), the luminescence lifetime of the target film is extended, indicating that the ions in EAL form hydrogen bonds and coordination bonds with I<sup>−</sup> and Pb<sup>2+</sup> in the PVK structure. This optimization of energy level alignment enhances the charge extraction efficiency at the upper and lower interfaces.

Additionally, Li and colleagues<sup><a href="#ref77">77</a></sup> constructed an efficient CsPbI<sub>3</sub>/[CYS][PbCl<sub>2</sub>] heterojunction by reacting cysteamine with PbCl<sub>2</sub>, leading to the formation of a 3D PVK with a shallower Fermi level. This modification significantly suppresses interfacial energy loss, further improving the PV performance of the solar cells. As shown in [Figure 6e](#figure_6), due to the downward bending of energy levels in the CsPbI<sub>3</sub>/[CYS][PbCl<sub>2</sub>] heterojunction, photogenerated electrons are more effectively transferred from CsPbI<sub>3</sub> to [CYS][PbCl<sub>2</sub>]. This more efficient electron transfer reduces carrier recombination, thereby shortening the carrier lifetime, indicating that the electron extraction efficiency at the CsPbI<sub>3</sub>/[CYS][PbCl<sub>2</sub>] heterojunction interface is higher, which helps to improve the performance of solar cells.

Dai's team<sup><a href="#ref78">78</a></sup> used the thiophene derivative 3-thienylmethyl iodide (3-ThMAI) as an interfacial modifier between the CsSnI<sub>3</sub> perovskite surface and the electron transport layer. As shown in [Figure 6f](#figure_6), the decay lifetime of the CsSnI<sub>3</sub> film becomes longer after modification with 2-ThMAI and 3-ThMAI, indicating that the uncoordinated Sn<sup>2+</sup> on the surface of CsSnI<sub>3</sub> spontaneously coordinates with the lone pair of electrons from sulfur atoms, forming chemical bonding, thereby passivating surface defect states. This chemical bonding reduces surface nonradiative recombination.

TRPL technology plays a crucial role in the research of PSCs, as it not only reveals the carrier dynamics within the materials, including the lifetime and polarization coupling of carriers, but also aids in optimizing material and interface

<a id="figure_8"></a>
<Image src="https://s2.loli.net/2025/01/15/n8xtCsKM6oBFzbh.png" alt="12123" class="mx-auto my-0 w-full max-w-lg" width="1000" height="1000" loading="lazy" />

<div class="text-sm">
    <strong>Figure 8.</strong>
    Confocal PL mapping of
    <br>
    (a) pristine CsFA,
    <br>
    (b) 2D-S/CsFA,
    <br>
    (c) 2D-R/CsFA PVK samples.
    <br>
    Adapted with permission from ref 88. Copyright 2023 Wiley-VCH.
    <br>
    (d) PL mapping results for PbI<sub>2</sub>-FACsMA and amo-FACsMA films (area: 10 μm × 5 μm), respectively. Adapted with permission from ref 89. Copyright 2024 Nature Publishing Group.
    <br>
    (e) PL mappings of control film and (f) target film, respectively (scale bar: 20 μm). Adapted with permission from ref 90. Copyright 2024 American Chemical Society.
    <br>
    PL mapping images of the PVK-film-buried surface prepared on (g) the glass and (h) glass/SZC substrates. Adapted with permission from ref 91. Copyright 2024 Wiley-VCH.
</div>

treatments as well as suppressing defect states to enhance the performance and stability of solar cells. By probing the dynamics of the radiative transition spectrum of excited states in materials over time, TRPL provides vital information on the kinetic characteristics of materials, fostering the development of PSCs technology.

**3.3. PLQY Characterization in PSCs.** In PSCs, PLQY is a very important parameter, higher PLQY means that the photogenerated carriers in the material are more likely to undergo photoelectric conversion rather than being lost as heat through nonradiative recombination.<sup><a href="#ref79">79</a></sup> For instance, Xu et al.<sup><a href="#ref80">80</a></sup> have inserted an insulating layer of Al<sub>2</sub>O<sub>3</sub> nanosheets between the absorber layer and the transport layer, achieving a new type of porous insulator contact (PIC) structure. As shown in [Figure 7a](#figure_7), increasing the concentration of Al<sub>2</sub>O<sub>3</sub> nanosheets leads to enhanced PLQY and prolonged PL lifetime. This suggests that the PIC structure reduces the surface and bulk defect density by decreasing the contact area between the perovskite and the HTL and by providing interfacial passivation, which in turn reduces the pathways for nonradiative recombination.

Wu et al.<sup><a href="#ref81">81</a></sup> reported a hole-transporting material named MPA-CPA, which forms an ultra-wetting underlayer on the ITO substrate. The synergistic effect of the CPA groups with Pb<sup>2+</sup> reduces the loss of nonradiative recombination. The PLQY of PVK films prepared on different HTL shown in [Figure 7b](#figure_7), providing a visual understanding of the impact of each HTL on the carrier recombination dynamics in the PVK film.

In the study by Wang et al.,<sup><a href="#ref82">82</a></sup> the stabilization of lead-free PVK was achieved by doping with cyanuric acid (CA), which forms hydrogen-bonded dimers and trimers on the perovskite surface, leading to the creation of supramolecular structures. This electronic localization mitigates the adverse effects of Anderson localization and improves the order of the lead-free PVK crystal structure. As a result, the nonradiative recombination capture coefficient is reduced by 2 orders of magnitude, while the exciton binding energy is approximately doubled. The increase in PLQY shown in [Figure 7c](#figure_7), indicates that the hydrogen-bonded supramolecular structures play a crucial role in stabilizing the PVK surface. Furthermore, the higher PLQY suggests that more carriers are generated, and the likelihood of nonradiative recombination among carriers trapped in defect states is significantly diminished. This implies that the optimization strategies employed not only enhance the stability of the PVK but also improve its luminescent properties, contributing to better performance in solar cells.

In the field of exploring kinetic models, Christian M. Wolff<sup><a href="#ref83">83</a></sup> group investigated the carrier recombination processes occurring at different carrier concentrations in mixed-halide PVK. They developed a model to describe the carrier dynamics within the device, as illustrated in [Figure 7d](#figure_7), where the model predictions were validated against experimental data for PLQY. Their findings indicated that extending the extending the carrier lifetime beyond 3 μs could significantly enhance the efficiency of PSCs through photon reuse. This discovery offers a crucial avenue for optimizing the performance of PSCs.

PLQY is a key parameter for assessing the performance of PSCs, directly related to the photoelectric conversion efficiency of photogenerated carriers in the material. A high

<a id="figure_9"></a>
<Image src="https://s2.loli.net/2025/01/15/oiwqX5pThHSc7D9.png" alt="12123" class="mx-auto my-0 w-full max-w-lg" width="1000" height="1000" loading="lazy" />

<div class="text-sm">
    <strong>Figure 9.</strong>
    TA spectra of (a) C<sub>60</sub>/CM and (b) APTES-linked C<sub>60</sub>/CM samples. Adapted with permission from ref 92. Copyright 2021 Wiley-VCH.
    <br>
    The TA spectra of (c) ITO/PTAAPVK films and (d) ITO/PTAA/2PACz/PVK films. Adapted with permission from ref 93. Copyright 2023 Chinese Chemical Society.
    <br>
    TA spectra of (e) reference and (f) CdI<sub>2</sub>-doped film. Adapted with permission from ref 94. Copyright 2022 Wiley-VCH.
</div>

PLQY value indicates that the material can effectively convert absorbed light energy into photoluminescence, reducing the loss of energy through nonradiative recombination. Therefore, optimizing PLQY is crucial for improving the photoelectric conversion efficiency of solar cells, involving the generation, recombination of carriers, and the management of defects within the material. Enhancing PLQY can significantly improve the performance of PSCs, bringing them closer to the ideal photoelectric conversion efficiency.

**3.4. PL Mapping Characterization in PSCs.** PL mapping characterization technology is crucial in studying PSCs.<sup><a href="#ref84">84</a></sup> It allows for the analysis of defect distribution and spatial inhomogeneity by observing the uniformity of PL intensity. For instance, Yao et al.<sup><a href="#ref88">88</a></sup> introduced cross-linkable ligands beneath the 3D PVK, promoting preferential crystal growth and enhancing battery performance. In [Figure 8a−c](#figure_8), the 2D-S modified film demonstrates more uniform luminescence in the PL mapping compared to the original film, suggesting that the 2D-S layer reduces trap states at the interface. However, the stability of the 2D-S layer is limited, resulting in less pronounced improvements relative to the 2D-R layer. The D-R layer, exhibiting stronger solvent resistance, presents more uniform and brighter luminescence in the PL mapping.

Similarly, the Deren Yang team<sup><a href="#ref89">89</a></sup> utilized a solid-state reaction between PbI<sub>2</sub> and lysine molecules to form an amorphous layer at the surface and grain boundaries of PVK, which also enhances solar cell performance. In Figure 8d, the amo-FACsMA sample exhibits a highly consistent luminescence intensity across the entire surface. This indicates that the isotropic nature of the amorphous phase is more compatible with PVK.

Additionally, PL mapping characterization can reveal carrier dynamics characteristics within the film and at the interface through luminescence intensity changes. The Fei Zhang team<sup><a href="#ref90">90</a></sup> created [N(Z)]-N-(amino methylene) guanidine to eliminate charge defects at bulk and interface positions. As shown in Figures 8e and 9f, the PVK film treated with IIFAGA exhibits higher PL intensity than that the untreated control group, indicating that IIFAGA treatment can passivate defects.

In addition, Zhao et al.<sup><a href="#ref91">91</a></sup> used sodium 2-cyanoacetate (SZC) as an additive for in situ passivation of interface defects and regulation of crystallization, leading to high-performance flexible indoor photovoltaic applications. [Figure 8g](#figure_8) and [Figure 8h](#figure_8) shows that the PL intensity of the SZC-treated PVK film is brighter, signifying that interface modification reduces small grain formation on the surface and lowers the density of interface defects, thus minimizing nonradiative recombination.

The application of PL mapping in the research of PSCs covers the analysis of internal defect distribution and spatial uniformity of materials. By observing the uniformity of PL intensity, the impact of different interface treatments and material modifications on battery performance can be assessed. These experiments demonstrate the potential of PL mapping in optimizing the crystal growth of PVK, reducing interface defects, and improving photoelectric conversion efficiency. Overall, PL mapping technology provides a powerful analytical tool for gaining a deep understanding of the carrier dynamics in PSCs and enhancing their performance.

**3.5. Application of TA Spectroscopy in PVK.** TA spectroscopy is indeed a valuable tool for investigating carrier dynamics in PSCs.<sup><a href="#ref56">56</a></sup> Capturing ultrafast processes following photoexcitation provides insights into how charge carriers behave, including their lifetimes and recombination mechanisms. In the characterization of exploring electron transport efficiency, Tian et al.<sup><a href="#ref92">92</a></sup> demonstrated the enhancement of electron transport efficiency by using amphiphilic silane molecules to create strong chemical connections between the ITO substrate and C<sub>60</sub> ETL. This improved adhesion facilitates smoother electron injection from the PVK layer, as evidenced by the rapid decay of the GSB peak in [Figure 9b](#figure_9). In contrast, without APTES treatment, poor adhesion results in increased charge recombination and slower GSB signal decay.

Similarly, Chang et al.<sup><a href="#ref93">93</a></sup> introduced the binuclear chemical linker [2-(9H-carbazol-9-yl)ethyl] phosphonic acid (2PACz) between the poly[bis(4-phenyl)(2,4,6-trimethylphenyl)amine] (PTAA) and the PVK layer. This enhancement in interfacial contact affinity promotes efficient hole extraction and effectively passivates interfacial defects. In [Figure 9c](#figure_9) and [Figure 9d](#figure_9), the treated film exhibits faster GSB decay, indicating improved hole extraction. Additionally, the phosphonic acid groups in the 2PACz molecules form stable coordination bonds, further facilitating the effective transfer of holes. This underscores the critical role of interfacial engineering in optimizing charge transport and overall solar cell performance.

In the aspect of investigating carrier recombination efficiency, Liu's team<sup><a href="#ref94">94</a></sup> utilized CdI<sub>2</sub> as the active layer, where Cd partially replaces Pb in the perovskite lattice and remains at the surface, effectively reducing nonradiative recombination. As shown in [Figure 9e](#figure_9) and [Figure 9f](#figure_9), CDI<sub>2</sub>-doped films exhibit slower GSB signal attenuation, which reflects a lower carrier recombination rate and reduced nonradiative recombination. Additionally, in 2023, this team screened a special 2,6-diaminopyridine (2,6-DAPy) passivator, which eliminated iodine interstitials and passivated iodine vacancies.<sup><a href="#ref95">95</a></sup> The treated films show a stronger GSB signal. This indicates that the 2,6-DAPy treatment significantly suppresses various intrinsic defects and nonradiative recombination.

TA spectroscopy captures the ultrafast dynamics of charge carriers following photoexcitation, providing direct insights into the behavior of carriers in PSCs. By using TA spectroscopy, the impact of different materials and interfacial treatments on carrier dynamics can be assessed, guiding the design and improvement of PSCs. TA spectroscopy plays a central role in the study of carrier dynamics in PSCs, providing important scientific evidence for improving the efficiency and stability of the cells. In addition to the spectral techniques mentioned above, several emerging spectral technologies are being utilized to study the performance of PSCs. These include Raman mapping spectroscopy,<sup><a href="#ref96">96</a></sup>−<sup><a href="#ref99">99</a></sup> external quantum efficiency,<sup><a href="#ref94">94</a></sup>,<sup><a href="#ref100">100</a></sup> et al.

## 4. CONCLUSIONS

With the continuous advancement of spectroscopy techniques, the research and application of PSCs have become more in-depth and widespread. The integration of these spectral technologies not only enhances our understanding of the operational principles of PSCs but also provides a scientific foundation for their design and optimization. By employing these techniques in combination, researchers can comprehensively evaluate and enhance the performance of PSCs, paving the way for their practical applications in renewable energy.

## AUTHOR INFORMATION

### Corresponding Authors

**Tian Tian** − Institute of Innovation Materials and Energy, School of Chemistry and Chemical Engineering, Yangzhou University, Yangzhou 225002, P. R. China; <a href="https://orcid.org/0000-0001-9763-9481">orcid.org/0000-0001-9763-9481</a>; Email: tian91@yzu.edu.cn

**Huan Pang** − Institute of Innovation Materials and Energy, School of Chemistry and Chemical Engineering, Yangzhou University, Yangzhou 225002, P. R. China; State Key Laboratory of Coordination Chemistry, School of Chemistry and Chemical Engineering, Nanjing University, Nanjing 210093, P. R. China; <a href="https://orcid.org/0000-0002-5319-0480">orcid.org/0000-0002-5319-0480</a>; Email: huanpangchem@hotmail.com

### Authors

**Zongxuan Yuan** − Institute of Innovation Materials and Energy, School of Chemistry and Chemical Engineering, Yangzhou University, Yangzhou 225002, P. R. China

**Meifang Yang** − Institute of Innovation Materials and Energy, School of Chemistry and Chemical Engineering, Yangzhou University, Yangzhou 225002, P. R. China

**Lei Zhang** − Institute of Innovation Materials and Energy, School of Chemistry and Chemical Engineering, Yangzhou University, Yangzhou 225002, P. R. China

**Wen-Guang Li** − Institute of Innovation Materials and Energy, School of Chemistry and Chemical Engineering, Yangzhou University, Yangzhou 225002, P. R. China; School of Chemistry and Environment, Jiaying University, Meizhou 514015, P. R. China

Complete contact information is available at: https://pubs.acs.org/10.1021/acs.jpcc.4c06770

### Notes

The authors declare no competing financial interest.

### Biographies

**Zongxuan Yuan** received his bachelor's degree in Materials Science and Engineering from East China University of Technology in 2019. Currently, he is a graduate student in the research group of Professor Tian Tian and Professor Pang Huan. His research interests include the study of the HTL layer of perovskite solar cells.

**Meifang Yang** received her Ph.D. from Sun Yat-sen University in 2024. Her research focuses on semiconducting materials and optoelectronic devices.

**Lei Zhang** is a master's student at Yangzhou University. She received her bachelor's degree from Yangzhou University in 2023. Her research focuses on perovskite nanofiber membranes.

**Wen-Guang Li** received his Ph.D. from Sun Yat-sen University in 2020. His research interests revolve around the halide perovskite materials and their applications in X-ray detectors.

**Tian Tian** is a professor at Yangzhou University. She got her bachelor's degree from Northwest Minzu University (2014) and her Ph.D. degree from the University of Shanghai for Science and Technology (2020). Her research focuses on soft luminescent film fabrication and optoelectronic devices.

**Huan Pang** received his Ph.D. degree from Nanjing University (2011). He is now a professor and the dean of the School of Chemistry and Chemical Engineering at Yangzhou University. He is mainly engaged in the research of energy chemistry based on complex framework materials.

## ACKNOWLEDGMENTS

This work was supported by the National Natural Science Foundation of China (NSFC 22305215).

## REFERENCES

<div class="text-sm">
<a name="ref1"></a>
(1) Höök, M.; Tang, X. Depletion of fossil fuels and anthropogenic climate change-A review. Energy Policy 2013, 52, 797−809.

<a name="ref2"></a>
(2) Celik, I.; Phillips, A. B.; Song, Z.; Yan, Y.; Ellingson, R. J.; Heben, M. J.; Apul, D. Environmental analysis of perovskites and other relevant solar cell technologies in a tandem configuration. Energy Environ. Sci. 2017, 10, 1874−1884.

<a name="ref3"></a>
(3) Shukla, R.; Sumathy, K.; Erickson, P.; Gong, J. Recent advances in the solar water heating systems: A review. Renewable and Sustainable Energy Reviews 2013, 19, 173−190.

<a name="ref4"></a>
(4) Kärkäs, M. D.; Verho, O.; Johnston, E. V.; Åkermark, B. Artificial Photosynthesis: Molecular Systems for Catalytic Water Oxidation. Chem. Rev. 2014, 114, 11863−12001.

<a name="ref5"></a>
(5) Hedley, G. J.; Ruseckas, A.; Samuel, I. D. W. Light Harvesting for Organic Photovoltaics. Chem. Rev. 2017, 117, 796−837.

<a name="ref6"></a>
(6) Ran, J.; Zhang, J.; Yu, J.; Jaroniec, M.; Qiao, S. Z. Earth-abundant cocatalysts for semiconductor-based photocatalytic water splitting. Chem. Soc. Rev. 2014, 43, 7787−7812.

<a name="ref7"></a>
(7) Lin, H.; Yang, M.; Fu, Ru, X.; Wang, G.; Yin, S.; Peng, F.; Hong, C.; Qu, M.; Li, J.; Fang, L.; et al. Silicon heterojunction solar cells with up to 26.81% efficiency achieved by electrically optimized nanocrystalline-silicon hole contact layers. Nature Energy 2023, 8, 789−799.

<a name="ref8"></a>
(8) Schmidt, J.; Merkle, A.; Brendel, R.; Hoex, B.; de Sanden, M. C. M. v.; Kessels, W. M. M. Surface passivation of high-efficiency silicon solar cells by atomic-layer-deposited Al<sub>2</sub>O<sub>3</sub>. Progress in Photovoltaics: Research and Applications 2008, 16, 461−466.

<a name="ref9"></a>
(9) Kong, J.; Shin, Y.; Roh, J. A.; Wang, H.; Meng, J.; Wu, Y.; Katzenberg, A.; Kim, G.; Kim, D. Y.; Li, Y.; P.-D.; et al. CO<sub>3</sub> doping of organic interlayers for perovskite solar cells. Nature 2021, 594, 51−56.

<a name="ref10"></a>
(10) Wu, X.; Xu, G.; Yang, F.; Chen, W.; Yang, H.; Shen, Y.; Wu, Y.; Chen, H.; Xi, J.; Tang, X.; et al. Realizing 23.9% Flexible Perovskite Solar Cells via Alleviating the Residual Strain Induced by Delayed Heat Transfer. ACS Energy Letters 2023, 8, 3750−3759.

<a name="ref11"></a>
(11) Haque, S. M.; Ardila-Rey, J. A.; Umar, Y.; Rahman, H.; Mas'ud, A. A.; Muhammad-Sukki, F.; Albarracin, R. Polymeric Materials for Conversion of Electromagnetic Waves from the Sun to Electric Power. Polymers 2018, 10, 307.

<a name="ref12"></a>
(12) Lei, M.; Lan, Z.; Zhang, H. High Performance Ternary Organic Solar Cells Assisted by Red Fluorescent Materials Through Improved Emission Lifetime and Complementary Short Wavelength Light Absorption. Journal of Materials Chemistry C 2024, 12, 17170−17178.

<a name="ref13"></a>
(13) Solak, E. K.; Irmak, E. Advances in organic photovoltaic cells: a comprehensive review of materials, technologies, and performance. RSC Adv. 2023, 13, 12244−12260.

<a name="ref14"></a>
(14) De Wolf, S.; Holovsky, J.; Moon, S.-J.; Löper, P.; Niesen, B.; Ledinsky, M.; Haug, F.-J.; Yum, J.-H.; Ballif, C. Organometallic Halide Perovskites: Sharp Optical Absorption Edge and Its Relation to Photovoltaic Performance. J. Phys. Chem. Lett. 2014, 5, 1035−1039.

<a name="ref15"></a>
(15) Liu, M.; Johnston, M. B.; Snaith, H. J. Efficient planar heterojunction perovskite solar cells by vapour deposition. Nature 2013, 501, 395−398.

<a name="ref16"></a>
(16) Dong, Q.; Fang, Y.; Shao, Y.; Mulligan, P.; Qiu, J.; Cao, L.; Huang, J. Electron-hole diffusion lengths > 175 μm in solution-grown CH<sub>3</sub>NH<sub>3</sub>PbI<sub>3</sub> single crystals. Science 2015, 347, 967−970.

<a name="ref17"></a>
(17) Li, M.; Li, H.; Fu, J.; Liang, T.; Ma, W. Recent Progress on the Stability of Perovskite Solar Cells in a Humid Environment. J. Phys. Chem. C 2020, 124, 27251−27266.

<a name="ref18"></a>
(18) Bauer, M.; Zhu, H.; Baumeler, T.; Liu, Y.; Eickemeyer, F. T.; Lorenz, C.; Mena-Osteritz, E.; Hertel, D.; Olthof, S.; Zakeruddin, S. M.; et al. Cyclopentadiene-Based Hole-Transport Material for Cost-Reduced Stabilized Perovskite Solar Cells with Power Conversion Efficiencies Over 23%. Adv. Energy Mater. 2021, 11, 2003953.

<a name="ref19"></a>
(19) Seo, J.-Y.; Akin, S.; Zalibera, M.; Preciado, M. A. R.; Kim, H.-S.; Zakeruddin, S. M.; Milić, J. V.; Grätzel, M. Dopant Engineering for Spiro-OMeTAD Hole-Transporting Materials towards Efficient Perovskite Solar Cells. Adv. Funct. Mater. 2021, 31, 2102124.

<a name="ref20"></a>
(20) Xiang, J.; Cheng, Y.; Zhang, G.; Liu, Z.; Lian, C.; Gao, Q.; Wang, C.; Xie, J.; Li, S.; Zhou, Z.; et al. Efficient Carbon-Based Hole-Conductor-Free Printable Mesoscopic Perovskite Solar Cells via a Multifunctional Fluorinated Molecule. Adv. Funct. Mater. 2024, 34, 2402816.

<a name="ref21"></a>
(21) Li, G.; Song, J.; Wu, J.; Song, Z.; Wang, X.; Sun, W.; Fan, L.; Lin, J.; Huang, M.; Lan, Z.; Gao, P. Efficient and Stable 2D/3D Perovskite Solar Cells Based on Dual Optimization of Grain Boundary and Interface. ACS Energy Letters 2021, 6, 3614−3623.

<a name="ref22"></a>
(22) Iqbal, Z.; Zu, F.; Musiienko, A.; Gutierrez-Partida, E.; Köbler, H.; Gries, T. W.; Sannino, G. V.; Canil, L.; Koch, N.; Stolterfoht, M.; et al. Interface Modification for Energy Level Alignment and Charge Extraction in CsPbI<sub>3</sub> Perovskite Solar Cells. ACS Energy Letters 2023, 8, 4304−4314.

<a name="ref23"></a>
(23) Bose, A.; Thomas, I.; G, K.; Abraham, E. Fluorescence spectroscopy and its applications: A Review. International Journal of Advances in Pharmaceutical Analysis 2018, 8, 1−8.

<a name="ref24"></a>
(24) Naresh, K.; Lecturer; College, G. D.; Bichkunda; Nizamabad; Telangana. Applications of Fluorescence Spectroscopy. Journal of Chemical and Pharmaceutical Sciences 2014, 5, 18−21.

<a name="ref25"></a>
(25) Kenny; Chen, C.; Liu, B. Enhancing the performance of pure organic room-temperature phosphorescent luminophores. Nat. Commun. 2019, 10, 2111.

<a name="ref26"></a>
(26) Albani, J. R. Absorption Spectroscopy Theory. Principles and Applications of Fluorescence Spectroscopy; Wiley, 2007; pp 1−12.

<a name="ref27"></a>
(27) McCoustra, M. R. S. Electronic Absorption Spectroscopy: Theory and Practice. In Perspectives in Modern Chemical Spectroscopy, Andrews, D. L., Ed.; Springer: Berlin, Heidelberg, 1990; pp 87−103.

<a name="ref28"></a>
(28) Albani, J. R. Fluorescence Spectroscopy Principles. Principles and Applications of Fluorescence Spectroscopy; Wiley, 2007; pp 88−114.

<a name="ref29"></a>
(29) Mondal, P. P.; Diaspro, A. Basics of Fluorescence Photophysics. In Fundamentals of Fluorescence Microscopy: Exploring Life with Light, Mondal, P. P., Diaspro, A., Eds.; Springer: Dordrecht, The Netherlands, 2014; pp 111−134.

<a name="ref30"></a>
(30) Gryczynski, Z.; Gryczynski, I.; Lakowicz, J. Basics of fluorescence and FRET. Molecular Imaging; Springer, 2005; pp 21−56.

<a name="ref31"></a>
(31) Kirchartz, T.; Márquez, J. A.; Stolterfoht, M.; Unold, T. Photoluminescence-Based Characterization of Halide Perovskites for Photovoltaics. Adv. Energy Mater. 2020, 10, 1904134.

<a name="ref32"></a>
(32) Broommann, U.; Clegg, R. M. Fluorescence lifetimes: fundamentals and interpretations. Photosynthesis Research 2009, 101, 181−194.

<a name="ref33"></a>
(33) Time-Domain Lifetime Measurements. In Principles of Fluorescence Spectroscopy; Lakowicz, J. R., Ed.; Springer US: 2006; pp 97−155.

(34) Xu, D.; Li, T.; Han, Y.; He, X.; Yang, S.; Che, Y.; Xu, J.; Zou, H.; Guo, X.; Wang, J.; et al. Fluorine Functionalized MXene QDs for Near-Second-Efficiency CsPbI<sub>3</sub> Solar Cell with High Open-Circuit Voltage. Adv. Funct. Mater. 2022, 32, 2203704.

<a name="ref35"></a>
(35) Zhang, J.; Huang, C.; Sun, Y.; Yu, H. Amino-Functionalized Niobium-Carbide MXene Serving as Electron Transport Layer and Perovskite Additive for the Preparation of High-Performance and Stable Methylammonium-Free Perovskite Solar Cells. Adv. Funct. Mater. 2022, 32, 2113367.

<a name="ref36"></a>
(36) Ding, J.; Lian, Z.; Li, Y.; Wang, S.; Yan, Q. The Role of Surface Defects in Photoluminescence and Decay Dynamics of High-Quality Perovskite MAPbI<sub>3</sub> Single Crystals. J. Phys. Chem. Lett. 2018, 9, 4221−4226.

<a name="ref37"></a>
(37) Pean, E. V.; Dimitrov, S.; De Castro, C. S.; Davies, M. L. Interpreting time-resolved photoluminescence of perovskite materials. Phys. Chem. Chem. Phys. 2020, 22, 28345−28358.

<a name="ref38"></a>
(38) Xu, Y.; Wang, Z.; Weng, Y. Defect States and Polarons in Photocatalytic Semiconductors Revealed via Time-Resolved Spectroscopy. J. Phys. Chem. C 2024, 128, 16275−16290.

<a name="ref39"></a>
(39) Lopes, J. M. S.; Barbosa Neto, N. M.; Araujo, P. T. An Introduction to Steady-State and Time-Resolved Photoluminescence. Springer Handbook of Inorganic Photochemistry, Springer Handbooks 2022, 6, 131−144.

<a name="ref40"></a>
(40) de Melo, J. S. S.; Costa, T.; de Castro, C. S.; Maçanita, A. L. Photophysics of fluorescently labeled oligomers and polymers. In Photochemistry; Albini, A., Fasani, E., Eds.; The Royal Society of Chemistry: 2013; Vol. 41, pp 59−126.

<a name="ref41"></a>
(41) Crosby, G. A.; Demas, J. N. Measurement of photoluminescence quantum yields. Review. J. Phys. Chem. 1971, 75, 991−1024.

<a name="ref42"></a>
(42) Ahn, T.-S.; Al-Kaysi, R. O.; Müller, A. M.; Wentz, K. M.; Bardeen, C. J. Self-absorption correction for solid-state photoluminescence quantum yields obtained from integrating sphere measurements. Rev. Sci. Instrum. 2007, 78, 086105.

<a name="ref43"></a>
(43) Suzuki, K.; Kobayashi, A.; Kaneko, S.; Takehira, K.; Yoshihara, T.; Ishida, H.; Shiina, Y.; Oishi, S.; Tobita, S. Reevaluation of absolute luminescence quantum yields of standard solutions using a spectrometer with an integrating sphere and a back-thinned CCD detector. Phys. Chem. Chem. Phys. 2009, 11, 9850−9860.

<a name="ref44"></a>
(44) Toniolo, E. P.; San Román, E.; Bratkovsky, S. E. Validation of Fluorescence Quantum Yields for Light-Scattering Powdered Samples by Laser-Induced Optoacoustic Spectroscopy. Langmuir 2009, 25, 5861−5868.

<a name="ref45"></a>
(45) Grabolle, M.; Spieles, M.; Lesnyak, V.; Gaponik, N.; Eychmüller, A.; Resch-Genger, U. Determination of the Fluorescence Quantum Yield of Quantum Dots: Suitable Procedures and Achievable Uncertainties. Anal. Chem. 2009, 81, 6285−6294.

<a name="ref46"></a>
(46) Yue, S.; Gamage, G. A.; Mohsinia, M.; Mayerich, D.; Talari, V.; Deng, Y.; Tian, F.; Dai, S. Y.; Sun, H.; Hadjiey, V. G.; et al. Photoluminescence mapping and time-domain thermo-photoluminescence for rapid imaging and measurement of thermal conductivity of boron arsenide. Materials Today Physics 2020, 13, 100194.

<a name="ref47"></a>
(47) Chen, F.; Zhang, Y.; Gfroerer, T. H.; Finger, A. N.; Wanlass, M. W. Spatial resolution versus data acquisition efficiency in mapping an inhomogeneous system with species diffusion. Sci. Rep. 2015, 5, 10542.

<a name="ref48"></a>
(48) Liu, G.; Zhong, Y.; Feng, W.; Yang, M.; Yang, G.; Zhong, J. X.; Tian, T.; Luo, J. B.; Tao, J.; Yang, S.; et al. Multidentate Chelation Heals Structural Imperfections for Minimized Recombination Loss in High-Efficiency Perovskite Solar Cells. Angew. Chem., Int. Ed. 2024, 63, e202209464.

<a name="ref49"></a>
(49) Nishimura, N.; Wang, K.-L.; Jin, R.-I.; Chen, C.-H.; Chen, J.; Xia, Y.; Huang, L.; Li, Y.-H.; Donnabelle Balela, M.; Wang, Z.-K.; Liao, L.-S. Dual-Functional group passivation to foster buried interface Cohesion for High-Performance perovskite photovoltaics. Chemical Engineering Journal 2024, 498, 155183.

<a name="ref50"></a>
(50) Yang, Y.; Chen, R.; Wu, J.; Dai, Z.; Luo, C.; Fang, Z.; Wan, S.; Chao, L.; Liu, Z.; Wang, H. Bilateral Chemical Linking at NiOx Buried Interface Enables Efficient and Stable Inverted Perovskite Solar Cells and Modules. Angew. Chem., Int. Ed. 2024, 63, e202308829.

<a name="ref51"></a>
(51) Hu, L.; Duan, L.; Yao, Y.; Chen, W.; Zhou, Z.; Cazorla, C.; Lin, C. H.; Guan, X.; Geng, X.; Wang, F.; et al. Quantum Dot Passivation of Halide Perovskite Films with Reduced Defects, Suppressed Phase Segregation, and Enhanced Stability. Advanced Science 2022, 9, 2102258.

<a name="ref52"></a>
(52) Guo, J.; Sun, J.; Hu, L.; Fang, S.; Ling, X.; Zhang, X.; Wang, Y.; Huang, H.; Han, C.; Cazorla, C.; et al. Indigo: A Natural Molecular Passivator for Efficient Perovskite Solar Cells. Adv. Energy Mater. 2022, 12, 2200537.

<a name="ref53"></a>
(53) Zhang, W.; He, L.; Meng, Y.; Kanda, H.; Tang, D.; Ding, B.; Ding, Y.; Nazeeruddin, M. K.; Li, X. Dual Site Synergistic Passivation for Highly Efficient and Stable Perovskite Solar Cells. Adv. Energy Mater. 2022, 12, 2202189.

<a name="ref54"></a>
(54) Zhang, H.; Xiang, W.; Zuo, X.; Gu, X.; Zhang, S.; Du, Y.; Wang, Z.; Liu, Y.; Wu, H.; Wang, P.; et al. Fluorine-Containing Passivation Layer via Surface Chelation for Inorganic Perovskite Solar Cells. Angew. Chem., Int. Ed. 2023, 62, e202216634.

<a name="ref55"></a>
(55) Li, C.; Wang, A.; Deng, X.; Wang, S.; Yuan, Y.; Ding, L.; Hao, F. Insights into Ultrafast Carrier Dynamics in Perovskite Thin Films and Solar Cells. ACS Photonics 2020, 7, 1893−1907.

<a name="ref56"></a>
(56) Ruckebusch, C.; Sliwa, M.; Pernot, P.; de Juan, A.; Tauler, R. Comprehensive data analysis of femtosecond transient absorption spectra: A review. Journal of Photochemistry and Photobiology C: Photochemistry Reviews 2012, 13, 1−27.

<a name="ref57"></a>
(57) Hammandlu, C.; Pasto, R.; Tsai, H.; Yadav, S. N. S.; Lai, K.-W.; Wang, Y.-Y.; Gantepogu, C. S.; Hou, C.-H.; Shyue, J.-J.; Lu, Y.-J.; et al. 3D nanographene precursor suppress interfacial recombination in PEDOT: PSS based perovskite solar cells. Nano Energy 2023, 107, 108136.

<a name="ref58"></a>
(58) Pydzińska, K.; Karolczak, J.; Kosta, I.; Tena Zaera, R.; Todinova, A.; Idígoras, J.; Anta, J. A.; Ziółek, M. Determination of Interfacial Charge Transfer Rate Constants in Perovskite Solar Cells. ChemSusChem 2016, 9, 1647−1659.

<a name="ref59"></a>
(59) Cao, Y.; Feng, J.; Wang, M.; Yan, N.; Lou, J.; Feng, X.; Xiao, F.; Liu, Y.; Qi, D.; Yuan, Y.; et al. Interface Modification by Ammonium Sulfamate for High Efficiency and Stable Perovskite Solar Cells. Adv. Energy Mater. 2023, 13, 2302103.

<a name="ref60"></a>
(60) Zhou, C.; Zhang, T.; Zhang, C.; Liu, X.; Wang, J.; Lin, J.; Chen, X. Unveiling Charge Carrier Recombination, Extraction, and Hot Carrier Dynamics in Indium Incorporated Highly Efficient and Stable Perovskite Solar Cells. Advanced Science 2024, 9, 210491.

<a name="ref61"></a>
(61) Berera, R.; van Grondelle, R.; Kennis, J. T. M. Ultrafast transient absorption spectroscopy: principles and application to photosynthetic systems. Photosynthesis Research 2009, 101, 105−118.

<a name="ref62"></a>
(62) Zhu, H.; Yang, Y.; Hyeon-Deuk, K.; Califano, M.; Song, N.; Wang, Y.; Zhang, W.; Prezhdo, O. V.; Lian, T. Auger-Assisted Electron Transfer from Photoexcited Semiconductor Quantum Dots. Nano Lett. 2014, 14, 1263−1269.

<a name="ref63"></a>
(63) Mukamel, S. Resonant Gratings, Pump-Probe, and Hole-Burning Spectroscopy. Principles of Nonlinear Optical Spectroscopy; Oxford University Press, 1995; pp 321−340.

<a name="ref64"></a>
(64) Li, Y.; Zhang, Y.; Zhu, P.; Li, J.; Wu, J.; Zhang, J.; Zhou, X.; Jiang, Z.; Wang, X.; Xu, B. Achieving 17.46% Efficiency CsPbI<sub>3</sub> Perovskite Solar Cells via Multifunction Lead Chloride-Modified ZnO Electron Transporting Layer. Adv. Funct. Mater. 2023, 33, 2309010.

<a name="ref65"></a>
(65) Xing, Z.; Liu, F.; Li, S.-H.; Huang, X.; Fan, A. J.; Huang, Y.; Yang, S. Bowl-Assisted Ball Assembly for Solvent-Processing the C<sub>60</sub> Electron Transport Layer of High-Performance Inverted Perovskite Solar Cell. Angew. Chem., Int. Ed. 2023, 62, e202315357.

<a name="ref66"></a>
(66) Bai, C.; Dong, W.; Cai, H.; Zu, C.; Yao, W.; Li, H.; Zhao, J.; Huang, F.; Cheng, Y.-B.; Zhong, J. Electrochemical Reduction and Ion Injection of Annealing-Free SnO<sub>2</sub> for High Performance Perovskite Solar Cells. Adv. Energy Mater. 2023, 13, 2300491.

<a name="ref67"></a>
(67) Chen, P.; Pan, W.; Zhu, S.; Cao, F.; Tong, A.; He, R.; Lan, Z.; Sun, W.; Jin, J. Buried modification with tetramethylammonium chloride to enhance the performance of perovskite solar cells with n-i-p structure. Chemical Engineering Journal 2023, 468, 143652.

<a name="ref68"></a>
(68) Duan, L.; Liu, S.; Wang, X.; Zhang, Z.; Luo, J. Interfacial Crosslinking for Efficient and Stable Planar TiO<sub>2</sub> Perovskite Solar Cells. Advanced Science 2024, 11, 2402796.

<a name="ref69"></a>
(69) Chavan, R. D.; Bończak, B.; Kruszynska, J.; Mahapatra, A.; Ans, M.; Nawrocki, J.; Nikiforow, K.; Yadav, P.; Paczeszny, J.; Sadegh, F.; et al. Molecular Engineering of Azahomofullerene-based Electron

<a name="ref70"></a>
(70) Liao, Z.; Biyiklioglu, Z.; Yang, L.; Baş, H.; Dong, P.; Hu, J.; Deng, J.; Li, X.; Gao, Y.; Güzel, E.; Zhang, T. Two-dimensional phthalocyanine-based molecular additives realize efficient hole transport and enhanced ion immobilization for durable perovskite solar cells. Chemical Engineering Journal 2024, 492, 148682.

<a name="ref71"></a>
(71) Wang, Y.; Feng, M.; Chen, H.; Ren, M.; Wang, H.; Miao, Y.; Chen, Y.; Zhao, Y. Highly Crystalized Cl Doped SnO<sub>2</sub> Nanocrystals for Stable Aqueous Dispersion Toward High Performance Perovskite Photovoltaics. Adv. Mater. 2024, 36, 2305849.

<a name="ref72"></a>
(72) Zhao, R.; Wang, P.; Wang, L.; Zhao, Y.; Ge, C.; Sun, L.; Xie, L.; Hua, Y. In Situ Combined Hole Transport Layer for Highly Efficient Perovskite Solar Cells. Adv. Funct. Mater. 2024, 34, 2307559.

<a name="ref73"></a>
(73) Lv, Y.; Yang, Y.; Li, N.; Zhang, Y.; Hu, M.; Huang, B.; Zhu, Y.; Wang, Y.; Pan, J.; Wang, S.; et al. Hypervalent potassium xanthate modified SnO<sub>2</sub> for highly efficient perovskite solar modules. Chemical Engineering Journal 2023, 456, 140894.

<a name="ref74"></a>
(74) Pan, Y.; Wang, J.; Sun, Z.; Zhang, J.; Zhou, Z.; Shi, C.; Liu, S.; Ren, F.; Chen, R.; Cai, Y.; et al. Surface chemical polishing and passivation minimize non-radiative recombination for all-perovskite tandem solar cells. Nat. Commun. 2024, 15, 7335.

<a name="ref75"></a>
(75) Li, R.; Zhang, S.; Zhang, H.; Wang, Z.; Feng, X.; Du, Y.; Zhou, Y.; Chen, X.; Du, P.; Liu, L.; et al. Customizing Aniline Derived Molecular Structures to Attain beyond 22% Efficient Inorganic Perovskite Solar Cells. Angew. Chem., Int. Ed. 2024, 63, e202410600.

<a name="ref76"></a>
(76) Li, H.; Li, W.; Wang, K.; Tong, Y.; Wang, H.; Chen, Y.; Qi, H.; Kang, Z.; Wang, H. Ambient Air Processed Inverted Inorganic Perovskite Solar Cells with over 21% Efficiency Enabled by Multifunctional Ethacridine Lactate. Angew. Chem., Int. Ed. 2024, 63, e202407508.

<a name="ref77"></a>
(77) Lu, C.; Guo, X.; Zhang, W.; Yuan, H.; Liu, A.; Yang, H.; Li, W.; Cui, Z.; Fu, Y.; Li, X.; Fang, J. Efficient Inverted CsPbI<sub>3</sub> Solar Cells with Pb−S Contained Organosulfide Halide Perovskite Heterojunction. Adv. Funct. Mater. 2024, 34, 2305582.

<a name="ref78"></a>
(78) Zhang, Z.; Yu, H.; Huang, J.; Liu, Z.; Sun, Q.; Li, X.; Dai, L.; Shen, Y.; Wang, M. Over 12% efficient CsSnI<sub>3</sub> perovskite solar cells enabled by surface post-treatment with bi-functional polar molecules. Chemical Engineering Journal 2024, 490, 151561.

<a name="ref79"></a>
(79) Warby, J.; Zu, F.; Zeiske, S.; Gutierrez-Partida, E.; Frohloff, L.; Kahmann, S.; Frohna, K.; Mosconi, E.; Padicchi, E.; Lang, F.; et al. Understanding Performance Limiting Interfacial Recombination in pin Perovskite Solar Cells. Adv. Energy Mater. 2022, 12, 2103567.

<a name="ref80"></a>
(80) Peng, W.; Mao, K.; Cai, F.; Meng, H.; Zhu, Z.; Li, T.; Yuan, S.; Xu, Z.; Feng, X.; Xu, J.; et al. Reducing nonradiative recombination in perovskite solar cells with a porous insulator contact. Science 2023, 379, 683−690.

<a name="ref81"></a>
(81) Zhang, S.; Ye, F.; Wang, X.; Chen, R.; Zhang, H.; Zhan, L.; Jiang, X.; Li, Y.; Ji, X.; Liu, S.; et al. Minimizing buried interfacial defects for efficient inverted perovskite solar cells. Science 2023, 380, 404−409.

<a name="ref82"></a>
(82) Han, D.; Wang, J.; Agosta, L.; Zang, Z.; Zhao, B.; Kong, L.; Lu, H.; Mosquera-Lois, I.; Carnevali, V.; Dong, J.; et al. Lantanomer mixture coordination enables efficient lead-free perovskite LEDs. Nature 2023, 622, 493−498.

<a name="ref83"></a>
(83) Wolff, C. M.; Bourelle, S. A.; Phuong, L. Q.; Kurpiers, J.; Feldmann, S.; Caprioglio, P.; Marquez, J. A.; Wolansky, J.; Unold, T.; Stolterfoht, M.; et al. Orders of Recombination in Complete Perovskite Solar Cells - Linking Time Resolved and Steady State Measurements. Adv. Energy Mater. 2021, 11, 2101823.

<a name="ref84"></a>
(84) Leng, X.; Zheng, Y.; He, J.; Shen, B.; Wang, H.; Li, Q.; Liu, X.; Lin, M.; Shi, Y.; Wei, Z.; et al. Mechanical strengthening of a perovskite-substrate heterointerface for highly stable solar cells. Energy Environ. Sci. 2024, 17, 4295−4303.

<a name="ref85"></a>
(85) Huang, L.; Wang, K.-L.; Jin, R.-J.; Chen, J.; Chen, C.-H.; Xia, Y.; Lou, Y.-H.; Wang, Z.-K. Reshaped buried interface by comprehensive passivation for highly efficient perovskite photovoltaics. Chemical Engineering Journal 2024, 488, 150815.

<a name="ref86"></a>
(86) Gao, H.; Xiao, K.; Lin, R.; Zhao, S.; Wang, W.; Dayneko, S.; Duan, C.; Ji, C.; Sun, H.; Bui, A. D.; et al. Homogeneous crystallization and buried interface passivation for perovskite tandem solar modules. Science 2024, 383, 855−859.

<a name="ref87"></a>
(87) Li, N.; Luo, Y.; Chen, Z.; Niu, X.; Zhang, X; Lu, J.; Kumar, R.; Jiang, J.; Liu, H.; Guo, X.; et al. Microscopic Degradation in Formamidinium-Cesium Lead Iodide Perovskite Solar Cells under Operational Stressors. Joule 2020, 4, 1743−1758.

<a name="ref88"></a>
(88) Zhang, F.; Tu, B.; Yang, S.; Fan, K.; Liu, Z.; Xiong, Z.; Zhang, J.; Li, W.; Huang, H.; Yu, C.; et al. Buried Interface Engineering of Conformal 2D/3D Perovskite Heterojunction for Efficient Perovskite/Silicon Tandem Solar Cells on Industrially Textured Silicon. Adv. Mater. 2023, 35, 2303139.

<a name="ref89"></a>
(89) Wen, Y.; Zhang, T.; Wang, X.; Liu, T.; Wang, Y.; Zhang, R.; Kan, M.; Wan, L.; Ning, W.; Wang, Y.; Yang, D. Amorphous (lysine)<sub>2</sub>PbI<sub>4</sub> layer enhanced perovskite photovoltaics. Nat. Commun. 2024, 15, 7085.

<a name="ref90"></a>
(90) Wu, P.; Heo, J. H.; Shi, Y.; Wang, S.; Li, M.; Xiao, C.; Li, X.; Zhang, F. In Situ Formation of High-pKa Cations for Perovskite Solar Cells. ACS Energy Letters 2024, 9, 4526−4533.

<a name="ref91"></a>
(91) Liu, G.; Yang, T.; Cai, W.; Wang, Y.; Chen, X.; Wang, S.; Huang, W.; Du, Y.; Wu, N.; Wang, Z.; et al. Flexible Indoor Perovskite Solar Cells by In Situ Bottom Up Crystallization Modulation and Interfacial Passivation. Adv. Mater. 2024, 36, e2311562.

<a name="ref92"></a>
(92) Tian, T.; Zhong, J.; Feng, W.; Yang, M.; Tian, T.; Gong, L.; Wu, W. Chemical Linkage and Passivation at Buried Interface for Thermally Stable Inverted Perovskite Solar Cells with Efficiency over 23%. CCS Chemistry 2023, 5, 1802−1814.

<a name="ref93"></a>
(93) Tan, Y.; Chang, X.; Zhong, J.; Feng, W.; Yang, M.; Tian, T.; Gong, L.; Wu, W. Chemical Linkage and Passivation at Buried Interface for Thermally Stable Inverted Perovskite Solar Cells with Efficiency over 23%. CCS Chemistry 2023, 5, 1802−1814.

<a name="ref94"></a>
(94) Xu, T.; Xiang, W.; Kubicki, D. J.; Liu, Y.; Trees, W.; Liu, S. Simultaneous Lattice Engineering and Defect Control via Cadmium Incorporation for High Performance Inorganic Perovskite Solar Cells. Advanced Science 2022, 9, 2204486.

<a name="ref95"></a>
(95) Wang, Z.; Tian, Q.; Zhang, H.; Xie, H.; Du, Y.; Liu, L.; Feng, X.; Najar, A.; Ren, X.; Liu, S. Managing Multiple Halide Related Defects for Efficient and Stable Inorganic Perovskite Solar Cells. Angew. Chem., Int. Ed. 2023, 62, e202305815.

<a name="ref96"></a>
(96) Das, R. S.; Agrawal, Y. K. Raman spectroscopy: Recent advancements, techniques and applications. Vib. Spectrosc. 2011, 57, 163−176.

<a name="ref97"></a>
(97) Liu, Z.; Zhang, N.; Xiong, Y. In Situ Raman Characterizations for Enhanced Understandings on Electrocatalysis. J. Phys. Chem. C 2024, 128, 13651−13665.

<a name="ref98"></a>
(98) Orlando, A.; Francescutti, F.; Musics, C.; Pidkova, S.; Bartoli, M.; Rovere, M.; Tagliaferro, A. A Comprehensive Review on Raman Spectroscopy Applications. Chemosensors 2021, 9, 262.

<a name="ref99"></a>
(99) Zhou, Y.; Xu, T.; Xu, M.; Yin, Y.; Wang, Y.; Jin, Y.; Wang, C. Raman spectroscopy real-time detection for the performance of perovskite solar cell. Opt. Mater. 2021, 112, 110806.

<a name="ref100"></a>
(100) Zhang, X.; Zhang, D.; Zhou, Y.; Du, Y.; Jin, J.; Zhu, Z.; Wang, Z.; Cui, X.; Li, J.; Wu, S.; et al. Fluorinated Interfaces for Efficient and Stable Low-Temperature Carbon-Based CsPbI2Br Perovskite Solar Cells. Adv. Funct. Mater. 2022, 32, 2205478.

</div>
